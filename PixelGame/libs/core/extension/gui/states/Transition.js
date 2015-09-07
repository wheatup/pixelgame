var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var Transition = (function () {
            function Transition() {
                /**
                 * 该字符串指定在应用过渡时要从中进行更改的视图状态。默认值为“*”，表示任何视图状态。
                 * <p>可以将该属性设置为空字符串“”，它对应于基本视图状态。</p>
                 */
                this.fromState = "*";
                /**
                 *  该字符串指定在应用过渡时要更改到的视图状态。默认值为“*”，表示任何视图状态。
                 *
                 *  <p>可以将该属性设置为空字符串“”，它对应于基本视图状态。</p>
                 */
                this.toState = "*";
                /**
                 * 设置为 true 以指定该过渡应用于正向和逆向视图状态更改。
                 * 因此，对于从视图状态 A 到视图状态 B 的更改以及从视图状态 B 到视图状态 A 的更改，使用该过渡。
                 */
                this.autoReverse = false;
                /**
                 * 该属性控制当前过渡中断时的行为方式。 InterruptionBehavior 类定义此属性的可能值。
                 * 默认值为end
                 */
                this.interruptionBehavior = gui.InterruptionBehavior.END;
            }
            var __egretProto__ = Transition.prototype;
            return Transition;
        })();
        gui.Transition = Transition;
        Transition.prototype.__class__ = "egret.gui.Transition";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
