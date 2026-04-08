export async function onRequestGet(context) {
    try {
        const { results } = await context.env.DB.prepare(
            "SELECT code, name FROM categories WHERE is_visible = 1"
        ).all();

        return Response.json({
            isVisible: results.length > 0, // Is the app online at all?
            categories: results // Only visible categories, without passwords
        });
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}