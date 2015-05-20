/**
 * Created by tom.chang on 2015/5/14.
 *
 *
 * module b require a
 */
define(["tomRequire/b"],function(b){
    return {name:"module c",parent:b}
})

