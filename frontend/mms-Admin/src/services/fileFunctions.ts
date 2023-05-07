import { error } from "console";
import { resolve } from "path";

// const readFileAsBase64 = function (file: string): Promise<string> {
//      return new Promise<string>((accept, reject)=>{
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload=()=> resolve(reader.result?.toString()|| '');
//         reader.onerror=(error)=> reject(error);
//      })
//   };