/**
 * Created by tom.chang on 2015/5/14.
 *
 *
 * module b require a
 */
define(["tomRequire/a"],function(a){
    return {name:"b",parent:a};
})

