
/**
 * Created by tom.chang on 2015/5/14.
 */
(function(factory){
    if ( typeof define === "function" && define.amd ) {
        define( ["jquery"], factory);
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function () { called = true;})
        var callback = function () {if (!called) $($el).trigger($.support.transition.end) }
        setTimeout(callback, duration)
        return this
    }

    //dom ready еп╤о
    $(function () {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function (e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })
});
