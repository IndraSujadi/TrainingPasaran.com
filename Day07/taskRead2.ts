// buat versi syncronus

import { doesNotMatch } from 'assert';
import * as fs from 'fs';
import {join} from 'path';

let path = join(__dirname, '../dist');

fs.readdir(path, (error, fileList) => {
    if(error) {
        throw error;;
    }
    // console.log(fileList);
    let allResult = new Map();
    
    let i = 0;

    let baca = () => {
        fs.stat(join(path, fileList[i]), (error, result) =>{
            allResult.set(fileList[i], result.size);
            if( i === fileList.length-1) {
                console.log(allResult);
                console.log('done');
            } else {
                i += 1;
                baca();
            }
        });
    }
    baca();
});