<?php

namespace CodeShopping\Listeners;

use CodeShopping\Events\UserCreateEvent;

class SendMailToDefinePassword
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserCreateEvent  $event
     * @return void
     */
    public function handle(UserCreateEvent $event)
    {
        $user = $event->getUser();
        $token = \Password::broker()->createToken($user);
        $user->sendPasswordResetNotification($token);
    }
}
