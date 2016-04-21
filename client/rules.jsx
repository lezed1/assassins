import React from 'react';


export const Rules = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {pregame: Session.equals("gameState", "pregame")}
    },
    render() {
        var rulesState;
        if (this.data.pregame) {
            rulesState = (
                <div className="callout warning">
                    These rules are subject to change without notification until the game starts, at which point they
                    will become final.
                </div>
            );
        } else {
            rulesState = (
                <div className="callout secondary">
                    These rules are final and will not be changed without a notification email being sent to every
                    player.
                </div>
            );
        }

        return (
            <div>
                <div className="row">
                    <div className="small-12 columns">
                        <div className="callout primary">
                            {rulesState}
                            <ul>
                                <li>
                                    The Spoons game will start at 12:01 am on Friday, April 22th. You may pick up your
                                    personalized spoon from Mrs. Byrne directly before or after school, periods 3, 4 and
                                    7 in the L-faculty room, and 6th in the library on Thursday, April 21th. If you do
                                    not pick up your spoon before the start of the game and get tagged, you are still
                                    out.
                                </li>
                                <li>
                                    You must hold your spoon in your hand at all times. You cannot use tape or any
                                    other device (such as rubber bands, glue or bracelets) to keep your spoon in your
                                    hand. You may not tuck your spoon in your sleeve, or hide in under a shirt/jacket/
                                    blanket/etc. Basically, if you have your spoon with you - it, as well as your hand,
                                    must be visible. If the person who has you as a target can’t see your spoon, they
                                    are allowed to get you out.
                                </li>
                                <li>
                                    You have the name of your target. Your goal is to tag this person when he/she is
                                    not holding his/her spoon. Conversely, someone has you as a target. If you do not
                                    have your spoon in your hand, or it is hidden, and the person who has you as a
                                    target tags you, you are out.
                                </li>
                                <li>
                                    If you successfully tag your target, you must type your target's secret words into
                                    the appropriate textbox on your Dashboard. This is confirm your tag and
                                    automatically assign up a new target. The tag and new assignment will also be
                                    confirmed by Email.
                                </li>
                                <li>
                                    Now… when are you safe? When can you not be tagged out? You are safe when you are
                                    in class; during or on your way to and from practice or events that you are
                                    participating in, including locker rooms - (this includes but is not limited to
                                    sports, musical instrument lessons, theatre, dance, etc); or when you are in a
                                    parking lot or driving (we don’t want people playing in traffic); when you are in
                                    the bathroom; when you are in your own bedroom; when you are sleeping; or clocked in
                                    at work.
                                </li>

                                <li>
                                    To clarify the “in-class” portion of this - you are safe as long as you are in your
                                    classroom from the start of class (exactly one minute after the warning bells) to
                                    the end of the bells at the end of class. If your class is out of the classroom,
                                    outside or in a computer lab for example, that location counts as your classroom. If
                                    you leave your classroom early before the bells rings or for any other reason such
                                    as a bathroom break, then you are no longer safe. At all other times the game is on.
                                    You are also completely safe during the day of Prom - this exemption is from 12:00
                                    am on 6/17 to 1:00 am on 6/18. Your spoon may not be stolen during this day as well.
                                </li>
                                <li>
                                    Teachers maintain the right to make their classroom, or the space where they are
                                    teaching, a “Spoons Free” zone. That means in their class you may not be tagged out,
                                    you may not tag anyone, and you may not steal the spoon of someone in that
                                    classroom. You are not safe once you leave the room thought.
                                </li>
                                <li>
                                    For AP Exams: if you are taking an AP Exam you are completely safe from when you
                                    arrive at the exam site to when you leave. Your spoon may not be stolen at this time
                                    so you are safe to leave it in your bag/coat at the exam site. This game may not
                                    interfere with the AP exams in any way. Once you have left the exam site, the game
                                    is back on.
                                </li>
                                <li>
                                    If you lose your spoon or your parents throw it away, you are out of luck. You will
                                    not receive a new spoon nor will you be allowed to manufacture a new spoon. It will
                                    now be very easy for the person who has you as a target to tag you without your
                                    spoon in hand. If you are caught forging a new spoon you will be automatically out
                                    and anyone who you’ve eliminated while spoonless will be back in the game.
                                </li>
                                <li>
                                    You may not force a spoon out of your target’s hand in any way. You may trick them
                                    if at all possible, but you may not use physical force.
                                </li>
                                <li>
                                    You can steal someone else’s spoon if they are careless and leave it lying around
                                    (anyone can steal a spoon, not only the participants or seniors), but if they
                                    actually see you take it you have to give it back. Spoons can be stolen at any time.
                                    Again, spoons cannot be forced out of someone’s hand. If someone tells you they know
                                    who took it that does not count as seeing them take it. If they do not admit to
                                    taking it, they do not need to give it back. If they do admit to taking it, they
                                    have to give it back if they still have it. If they have disposed of it in some way
                                    or given it to someone else they do not need to give it back. If you have it on your
                                    person or property, and they take it back from you before you can stop them they are
                                    allowed to keep it.
                                </li>
                                <li>
                                    If you want to appeal, you and the person involved in the appeal, must seek out
                                    Rizzotti and present both sides of the case - witnesses would be helpful. The
                                    decision is final.
                                </li>
                                <li>
                                    The game will continue until only one person is left. This person will be deemed
                                    "<i>Spoons Champion</i>" and receive the use of Mr. Goetz’s parking spot for the
                                    week of 6/6-10. If, as of June 3rd, we do not have an outright winner a raffle for
                                    the parking spot will be had. The raffle will be set up such that you will get one
                                    ticket for yourself and an additional one for each person you have eliminated. This
                                    raffle will take place after school on 5/30. The game will continue on though so
                                    that one person can earn the distinction of being "<i>Spoons Champion</i>".
                                </li>
                                <li>
                                    Most importantly please remember that this is for fun. Play with good sportsmanship
                                    and have fun playing.
                                </li>
                                <li>
                                    Communication for Spoons will be sent out via eChalk so please check it regularly.
                                    Not checking your e-mail will not be an acceptable excuse for not knowing what’s
                                    going on.
                                </li>
                            </ul>
                            <p>
                                If, at any time, this game gets out of hand it will get cancelled. Teachers have been
                                notified that his game in happening and asked to report any issues. So let’s play this
                                game with respect for others and remember the fact that we are still in school and this
                                game should not interfere with any school activities, most importantly classes.
                            </p>
                            <p>
                                If you have any questions about the rules, or feel that a player is using the wording of
                                the rules to gain an unfair advantage, please <a href={FlowRouter.path("contact")}>contact
                                us</a>!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});