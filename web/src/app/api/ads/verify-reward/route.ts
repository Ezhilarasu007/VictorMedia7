import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { reward_event_id, user_id, ad_unit, reward_type, reward_amount, transaction_id } = await request.json();

    if (!reward_event_id || !user_id) {
      return NextResponse.json({ error: 'Missing required parameters: reward_event_id and user_id' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Check for duplicate reward_event_id to prevent replay attacks
    const { data: existing } = await supabase
      .from('reward_events')
      .select('id')
      .eq('reward_event_id', reward_event_id)
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Duplicate reward event detected. Replay attack rejected.' }, { status: 409 });
    }

    // Insert verified reward event
    const { data, error } = await supabase.from('reward_events').insert({
      reward_event_id,
      user_id,
      ad_unit: ad_unit || 'admob_rewarded_default',
      reward_type: reward_type || 'bonus_points',
      reward_amount: reward_amount || 10,
      transaction_id: transaction_id || null,
      verified: true
    }).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, reward: data });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error: ' + err.message }, { status: 500 });
  }
}
