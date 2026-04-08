export async function onRequestGet(context) {
    try {
        const { results } = await context.env.DB.prepare(
            "SELECT is_visible FROM settings ORDER BY id DESC LIMIT 1"
        ).all();

        const isVisible = results.length > 0 ? !!results[0].is_visible : false;

        return Response.json({ isVisible });
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}