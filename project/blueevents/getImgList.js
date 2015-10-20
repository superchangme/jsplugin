/**
 * Created by Administrator on 2015/9/4.
 */
var fs=require('fs');
var folder="src/img/";
var files=fs.readdirSync(folder)
var result=[];
console.log(files)
files.forEach(function(item){
  //  if(item.match(/p1_|p4|p2|p3/)){
        result.push(folder.replace("src/",'')+item);
   // }
})
console.log(result)