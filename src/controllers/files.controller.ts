//importacion de tablas de base de datos

import db from '../models'

//importacion de modulos para cargar archivos

import fs from "fs-extra";
import path from 'path';

//importaciones de dependencias de generacioon de archivos

import Excel from "exceljs"
import PdfPrinter from "pdfmake"
import { v4 as uuidv4 } from 'uuid';

//modulos de AWS S3

import { verify, verifyGestion } from "./login.controller"
//importacion de respuestas
import {INTERNAL_SERVER_ERROR} from '../config/http.request';

//Libreria de horas
//Declaracion de tablas
const {Gestiones} = db 

//Declaracion de hoja de trabajo
const workbook:any = new Excel.Workbook();

//---------------------------------------------------------------------------------------------------------------------/
//-------------------------------------------- Funciones usuario ------------------------------------------------------/
//---------------------------------------------------------------------------------------------------------------------/


//******************************************** Funcion para cargar las imagenes de perfil de cada usuario ********************************************/

export async function cargarImagenPerfil(req:any,res:any){
    
    //funcion de subida de archivos a traves de multer
    
    try{
        // 
    }catch(er){
        console.log(er)
    }
}

//******************************************** Renovacion de la url cuando llega a expirar ********************************************/

export async function renovacionURLPerfil(Time_renovacion_perfil:any,Renovacion_perfil:any,Imagen_perfil:any,id_user:any){
    try{
        // 
    }catch(er){
        // 
    }
}

//---------------------------------------------------------------------------------------------------------------------/
//-------------------------------------------- Funciones caja ---------------------------------------------------------/
//---------------------------------------------------------------------------------------------------------------------/

//******************************************** Crear las cajas de cada gestion  ********************************************/

export async function exportarData(req:any, res:any) {
    //todos lo datos necesarios para la exportacion de los datos encontrados en el segmento caja

    let {informacionAExportar, header, formato, widthPDF, heightPDF, token, tokenGestion} = req.query
    const nombreCodigo = uuidv4().substring(0,30)

    //segmento de verificacion de usuario y gestion a traves de token

    const userId:any = await verify(token)
    if(userId === false) {
        res.json({
            message: "Error en validación"
        });
        return;
    }
    const gestionId:any = await verifyGestion(tokenGestion)
    if(gestionId === false) {
        res.json({
            message: "Error en validación"
        });
        return;
    }

    try{

        //arreglar informacion importada

        informacionAExportar = JSON.parse(informacionAExportar)
        header = JSON.parse(header)

        //importar informacion de gestion 
            
        const management = await Gestiones.findOne({where:{Id_gestion: gestionId}}) 

        if(formato === 'XLSX (Excel)'){

            //creacion de hoja
           const wb:any = workbook.addWorksheet(nombreCodigo); 

            //guardar ruta generadora de archivos excel

            const pathExport = path.join(__dirname, '../files/excel', `${nombreCodigo}.xlsx`)

            //formato inicial de hoja de excel segun gestion

            const cell1 = wb.getCell(`A2`);
            cell1.value = "Gestion";
            const cell1_2 = wb.getCell(`A3`);
            cell1_2.value = `  ${management.Nombre_gestion}`;
            const cell2 = wb.getCell(`B2`);
            cell2.value = "Correo";
            const cell2_2 = wb.getCell(`B3`);
            cell2_2.value = `  ${management.Correo_gestion}`;
            const cell3 = wb.getCell(`C2`);
            cell3.value = "Gestion";
            const cell3_2 = wb.getCell(`C3`);
            cell3_2.value = `  ${management.Rif_gestion}`;
            const cell4 = wb.getCell(`D2`);
            cell4.value = "Tipo";
            const cell4_2 = wb.getCell(`D3`);
            cell4_2.value = `  ${management.Tipo_gestion}`;
            const cell5 = wb.getCell(`A4`);
            cell5.value = "";

            //color celdas gestion

            for(let i = 0; i < 4; i++){
                wb.getCell(`${wordsInfinite(i)}2`).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "297F87" },
                };
                wb.getCell(`${wordsInfinite(i)}2`).font = {
                    color: { argb: 'FFFFFF' },
                    size: 13,
                };
            }

            //carga ancho columnas

            header.forEach((field:any, index:any) => {
                wb.getColumn(index + 1).width = field.width;
            });

            //carga header

            const row1 = header.map((item:any) => item.label);
            wb.addRow(row1, `5`);
            header.forEach((item:any, index:number) => {
                wb.getCell(`${wordsInfinite(index)}5`).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "297F87" },
                };
                wb.getCell(`${wordsInfinite(index)}5`).font = {
                    color: { argb: 'FFFFFF' },
                    size: 13,
                };
            })

            //cargar informacion

            informacionAExportar.forEach((item:any,index2:number) => {
                const row2 = header.map((data:any) => item[data.value]);
                wb.addRow(row2, `${index2 + 5}`);
            })

            //cargar bordes a la data

            for(let i = 0; i < (informacionAExportar.length + 1); i++){
                header.forEach((data:any, index:number) => {
                    wb.getCell(`${wordsInfinite(index)}${i + 5}`).border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" },
                    };
                })
            }

            //carga y respuesta de archivo al usuario

            await workbook.xlsx.writeFile(pathExport);

            const worksheet = workbook.getWorksheet(nombreCodigo);
            workbook.removeWorksheet(worksheet.id);

            await res.download(`${path.join(__dirname, '../files/excel')}/${nombreCodigo}.xlsx`, function(){
                fs.unlink(`${path.join(__dirname, '../files/excel')}/${nombreCodigo}.xlsx`)
            })
        }
        if(formato === 'PDF'){

            //declaracion de variables necesarias para la elaboracion de pdfs

            let fonts:any = {
                Roboto: {
                    normal: Buffer.from(
                        require("pdfmake/build/vfs_fonts.js").pdfMake.vfs['Roboto-Regular.ttf'],
                        "base64"
                    ),
                    bold: Buffer.from(
                        require("pdfmake/build/vfs_fonts.js").pdfMake.vfs['Roboto-Medium.ttf'],
                        "base64"
                    )
                }
            }

            let arregloInformacion:any = [[]]
            let arrayColumns:any = []

            //creacion de arreglo con la informacion del pdf

            header.forEach((item:any) => {
                arregloInformacion[0] = [
                    ...arregloInformacion[0],
                    item.label
                ] 
                arrayColumns = [...arrayColumns, {width: item.widthPDF}]
            })

            for(let i = 0; i < (informacionAExportar.length); i++){
                arregloInformacion.push([])
                header.forEach((item:any,index:number) => {
                    arregloInformacion[i+1] = [
                        ...arregloInformacion[i+1],
                        informacionAExportar[i][`${item.value}`]
                    ] 
                })
            }

            let docDefinition = {
                pageSize: {width: Number(widthPDF), height: Number(heightPDF)},
                content: [
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        headerRows: 1,
                        widths: arrayColumns,
                        body: arregloInformacion
                    }
                }
                ]
            };
            
            const printer:any = new PdfPrinter(fonts)

            let pdfDoc:any = await  printer.createPdfKitDocument(docDefinition)

            await pdfDoc.pipe(fs.createWriteStream(path.join(__dirname, `../files/pdf/${nombreCodigo}.pdf`)))
            await pdfDoc.end()
            
            setTimeout(async () => {
                await res.download(`${path.join(__dirname, `../files/pdf/${nombreCodigo}.pdf`)}`, function(){
                    fs.unlink(`${path.join(__dirname, `../files/pdf/${nombreCodigo}.pdf`)}`)
                })
            }, 100);
        }
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({
             message: "Internal server error" 
        });
    }
}

export async function downloadImportFormat(req:any, res:any) {
    let {dataToImport, header, token, tokenGestion} = req.query
    console.log(req.query)
    const nombreCodigo = uuidv4().substring(0,30)

    const userId:any = await verify(token)
    if(userId === false) {
        res.json({
            message: "Error en validación"
        });
        return;
    }
    const gestionId:any = await verifyGestion(tokenGestion)
    if(gestionId === false) {
        res.json({
            message: "Error en validación"
        });
        return;
    }

    try{
        //arreglar informacion importada
        dataToImport = JSON.parse(dataToImport)
        header = JSON.parse(header)

        //creacion de hoja
        const wb:any = workbook.addWorksheet(nombreCodigo); 

        //guardar ruta generadora de archivos excel
        const pathImport = path.join(__dirname, '../files/excel', `${nombreCodigo}.xlsx`)

        //carga ancho columnas
        header.forEach((field:any, index:any) => {
            wb.getColumn(index + 1).width = field.width;
        });

        //carga header
        const row1 = header.map((item:any) => item.label);
        wb.addRow(row1, `1`);
        header.forEach((item:any, index:number) => {
            wb.getCell(`${wordsInfinite(index)}1`).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "297F87" },
            };
            wb.getCell(`${wordsInfinite(index)}1`).font = {
                color: { argb: 'FFFFFF' },
                size: 13,
            };
        })

        //cargar informacion
        dataToImport.forEach((item:any,index2:number) => {
            const row2 = header.map((data:any) => item[data.value]);
            wb.addRow(row2, `${index2 + 1}`);
        })

        //cargar bordes a la data
        for(let i = 0; i < (dataToImport.length + 1); i++){
            header.forEach((data:any, index:number) => {
                wb.getCell(`${wordsInfinite(index)}${i + 1}`).border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            })
        }

        //carga y respuesta de archivo al usuario
        await workbook.xlsx.writeFile(pathImport);

        const worksheet = workbook.getWorksheet(nombreCodigo);
        workbook.removeWorksheet(worksheet.id);

        await res.download(`${path.join(__dirname, '../files/excel')}/${nombreCodigo}.xlsx`, function(){
            fs.unlink(`${path.join(__dirname, '../files/excel')}/${nombreCodigo}.xlsx`)
        })
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: "Internal server error" 
        });
    }
}

function wordsInfinite(number:number){
    const words:any = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','V','W','X','Z']
    if(number <= 24){
        return words[number]
    }
    if(number > 24){
        return `${Math.ceil((words[number + 1])/24)}${words[number]}`
    }
}

