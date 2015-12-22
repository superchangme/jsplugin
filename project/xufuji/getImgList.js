/**
 * Created by Administrator on 2015/9/4.
 */
var fs=require('fs');
var folder="src/img";
var result=[];
function addFiles(folder){
        var files=fs.readdirSync(folder)

        files.forEach(function(item){
                //if(item.match(/p1_|p4|p2|p3/)){
                stats= fs.statSync(folder+"/"+item);
               if(stats.isDirectory(item)){
                       console.log(folder+"/"+item)
                       addFiles(folder+"/"+item);
               }else{
                   if(folder.indexOf('gf_frames')>-1||item.indexOf("_o")>-1){

                   } else{
                       result.push((folder+"/"+item).replace("src/","../"));

                   }
               }
                //}
        })
}
addFiles(folder)
console.log(result)