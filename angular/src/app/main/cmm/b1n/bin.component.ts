import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DashboardCustomizationConst } from '@app/shared/common/customizable-dashboard/DashboardCustomizationConsts';
import { CellValueChangedEvent, type ColDef, GridReadyEvent, SelectionChangedEvent, GridApi,  } from 'ag-grid-community';
import { CmmBinDto, CmmBinServiceProxy, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { GridParams, PaginationParamsModel } from '@app/shared/common/models/model.base';
import { ceil } from 'lodash-es';
import { GridTableService } from '@app/shared/common/services/grid-table.service';
import { finalize } from 'rxjs';
import { CreateOrEditCmmBinModalComponent } from './create-or-edit-bin-modal.component';

@Component({
    templateUrl: './bin.component.html',
})
export class CmmBinComponent extends AppComponentBase {
    @ViewChild('createOrEditModalCmmBin', { static: true }) createOrEditModalCmmBin: | CreateOrEditCmmBinModalComponent | undefined;

    dataParams: GridParams | undefined;

    isLoading;
    binName;
    binType;
    paginationParams: PaginationParamsModel = {
        pageNum: 1,
        pageSize: 20,
        totalCount: 0,
        skipCount: 0,
        sorting: '',
        totalPage: 1,
    };
    selectedRow: CmmBinDto;
    colDefs: ColDef[];
    gridApi!: GridApi;
    rowData;
    themeClass = 'ag-theme-alpine';
    defaultColDef = {
        resizable: true,
        sortable: true,
        textFormatter: function (r: any) {
            if (r == null) {
return null;
}
            return r.toLowerCase();
        },
        tooltip: (params) => params.value,
    };

    public autoSizeStrategy = {
        type: 'fitCellContents',
    };

    constructor(injector: Injector,
                private _service: CmmBinServiceProxy,
                private _gridTableService: GridTableService,
                private _userService: UserServiceProxy
        ) {
        super(injector);

        this.colDefs = [
            {
                headerName: this.l('STT'),
                headerTooltip: this.l('STT'),
                cellRenderer: (params) => params.rowIndex + 1 + this.paginationParams.pageSize * (this.paginationParams.pageNum - 1),
                flex: 1
            },
            {
                headerName: this.l('BIN'),
                headerTooltip: this.l('BIN'),
                field: 'binName',
                flex: 1
            },
            {
                headerName: this.l('Supplier'),
                headerTooltip: this.l('Supplier'),
                field: 'binType',
                flex: 1
            },
            {
                headerName: this.l('Description'),
                headerTooltip: this.l('Description'),
                field: 'description',
                flex: 1
            },
            {
                headerName: this.l('Creation Min Amount'),
                headerTooltip: this.l('Creation Min Amount'),
                field: 'creationMinAmount',
                flex: 1,
            },
            {
                headerName: this.l('Creation Fixed Fee'),
                headerTooltip: this.l('Creation Fixed Fee'),
                field: 'creationFixedFee',
                flex: 1,
            },
            {
                headerName: this.l('Creation Percent Fee'),
                headerTooltip: this.l('Creation Percent Fee'),
                field: 'creationPercentFee',
                flex: 1
            },
            {
                headerName: this.l('Funding Min Amount'),
                headerTooltip: this.l('Funding Min Amount'),
                field: 'fundingMinAmount',
                flex: 1,
            },
            {
                headerName: this.l('Funding Fixed Fee'),
                headerTooltip: this.l('Funding Fixed Fee'),
                field: 'fundingFixedFee',
                flex: 1,
            },
            {
                headerName: this.l('Funding Percent Fee'),
                headerTooltip: this.l('Funding Percent Fee'),
                field: 'fundingPercentFee',
                flex: 1
            },
        ];
    }

    searchDatas() {
        this.isLoading = true;
        this._service.getAll(
			this.binName,
            this.binType,
            '',
            this.paginationParams.skipCount,
            this.paginationParams.pageSize
        )
        .pipe(finalize(() => this._gridTableService.selectFirstRow(this.dataParams!.api)))
        .subscribe((result) => {
            this.paginationParams.totalCount = result.totalCount;
            this.rowData = result.items;
            this.paginationParams.totalPage = ceil(result.totalCount / (this.paginationParams.pageSize ?? 0));
            this.isLoading = false;
            this.resetGridView();
        });
    }


    getData(paginationParams?: PaginationParamsModel) {
        return this._service.getAll(
            this.binName,
            this.binType,
            '',
            this.paginationParams.skipCount,
            this.paginationParams.pageSize
        );
    }

    onChangeRowSelection(params: { api: { getSelectedRows: () => CmmBinDto[] } }) {
        const selected = params.api.getSelectedRows()[0];
        this.selectedRow = Object.assign({}, selected);

    }

    autoSizeAll() {
        const allColumnIds: string[] = [];
        this.gridApi.getColumns()!.forEach((column) => {
            allColumnIds.push(column.getId());
        });
        this.dataParams.columnApi.autoSizeColumns(allColumnIds);
    }

    resetGridView(){

        setTimeout(() => {
            // this.dataParams.columnApi!.sizeColumnsToFit(900);
            this.autoSizeAll();
        }, 1000);

    }

    clearTextSearch() {
        this.binName = '';
        this.binType = '';
        this.searchDatas();
    }

    onGridReady(params: GridParams) {
        // this.isLoading = true;
        // this.getData().subscribe((result) => {
        //     this.paginationParams.totalCount = result.totalCount;
        //     this.rowData = result.items;
        //     this.paginationParams.totalPage = ceil(result.totalCount / (this.paginationParams.pageSize ?? 0));
        //     this.isLoading = false;
        //     this.resetGridView();
        // });
        this.isLoading = true;
        this.dataParams = params;
        params.api.paginationSetPageSize(this.paginationParams.pageSize);
        this.paginationParams.skipCount =
            ((this.paginationParams.pageNum ?? 1) - 1) * (this.paginationParams.pageSize ?? 0);
        this.paginationParams.pageSize = this.paginationParams.pageSize;
        this.getData(this.paginationParams)
            .pipe(finalize(() => this._gridTableService.selectFirstRow(this.dataParams!.api)))
            .subscribe((result) => {
                this.paginationParams.totalCount = result.totalCount;
                this.rowData = result.items ?? [];
                this.paginationParams.totalPage = ceil(result.totalCount / (this.paginationParams.pageSize ?? 0));
                this.isLoading = false;
				this.resetGridView();
            });
    };

    // Handle cell editing event
    onCellValueChanged = (event: CellValueChangedEvent) => {
        console.log(`New Cell Value: ${event.value}`);
    };


}
