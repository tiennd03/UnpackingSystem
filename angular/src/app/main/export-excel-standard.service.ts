import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})

//Service này dùng để export excel dạng basic

export class ExportExcelService {

    constructor(
        private messageService: MessageService,
    ) {
     }

    exportExcel(listData: any[], filename: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
          try {
            if (!listData || listData.length === 0) {
              reject('No data to export');
              return;
            }

            console.log('List Data Export:', listData);

            const headers = Object.keys(listData[0]);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sheet1');

            // Style header
            worksheet.addRow(headers).eachCell({ includeEmpty: true }, (cell, colNumber) => {
              cell.font = { bold: true, color: { argb: 'ffffff' } }; // Màu chữ
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '3F51B5' } }; // Màu nền
            });

            // Add data vào worksheet
            listData.forEach(item => {
              worksheet.addRow(headers.map(header => item[header] || ''));
            });

            // Tính toán chiều rộng cột tự động
            headers.forEach((header, index) => {
              const maxLength = Math.max(...listData.map(item => (item[header] ? item[header].toString().length : 0)), header.length);
              worksheet.getColumn(index + 1).width = maxLength + 2;
            });

            // Create buffer và save file
            const buffer = await workbook.xlsx.writeBuffer();
            this.saveAsExcelFile(buffer, filename);
            resolve();
          } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Export', detail: error });
            console.error('Export Error:', error);
            reject(error);
          }
        });
      }

      private saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        saveAs(data, `${fileName}_export${EXCEL_EXTENSION}`);
        this.messageService.add({ severity: 'success', summary: 'Export', detail: 'Export Success' });
      }
}
