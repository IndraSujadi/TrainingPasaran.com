import * as fs from 'fs';
import {join} from 'path';



let path = join(__dirname, '../dist');

fs.readdir(path, (error, fileList) => {
    if(error) {
        throw error;;
    }
    // console.log(fileList);
    let allResult = new Map();
    for(let fileName of fileList) {
        fs.stat(join(path, fileName), (error, result) =>{
            allResult.set(fileName, result.size);
            if(allResult.size === fileList.length) {
                for(fileName of fileList) {
                    console.log(fileName +':'+allResult.get(fileName));
                }
                console.log('done');
            }
        });
        
    }
});