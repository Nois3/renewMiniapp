import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook handler for Farcaster Mini App events
 * 
 * Events received:
 * - frame_added: User adds the mini app
 * - frame_removed: User removes the mini app
 * - notifications_enabled: User enables notifications (includes notificationDetails with token and url)
 * - notifications_disabled: User disables notifications
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        console.log('Webhook received:', {
            event: body.event,
            timestamp: new Date().toISOString(),
            data: body
        });

        // Handle different event types
        switch (body.event) {
            case 'frame_added':
                console.log('Mini app added by user:', body.notificationDetails?.fid);
                // TODO: Store user info in database
                break;

            case 'frame_removed':
                console.log('Mini app removed by user:', body.notificationDetails?.fid);
                // TODO: Remove user info from database
                break;

            case 'notifications_enabled':
                console.log('Notifications enabled:', {
                    fid: body.notificationDetails?.fid,
                    token: body.notificationDetails?.token,
                    url: body.notificationDetails?.url
                });
                // TODO: Store notification token in database
                // The token should be stored securely and used to send notifications
                break;

            case 'notifications_disabled':
                console.log('Notifications disabled:', body.notificationDetails?.fid);
                // TODO: Remove notification token from database
                break;

            default:
                console.log('Unknown event type:', body.event);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
