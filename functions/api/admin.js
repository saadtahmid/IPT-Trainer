export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const { adminKey, action } = body;

        // Hardcoded admin key for simplicity
        const MASTER_ADMIN_KEY = "super_secret_admin_key_123";

        if (adminKey !== MASTER_ADMIN_KEY) {
            return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        if (action === "fetch") {
            const { results } = await context.env.DB.prepare(
                "SELECT * FROM categories ORDER BY code"
            ).all();

            return Response.json({ success: true, categories: results });

        } else if (action === "update") {
            const { categories } = body; // Array of objects

            // For simple bulk update
            for (let cat of categories) {
                await context.env.DB.prepare(
                    "UPDATE categories SET is_visible = ?, quiz_password = ? WHERE code = ?"
                ).bind(cat.is_visible ? 1 : 0, cat.quiz_password, cat.code).run();
            }

            return Response.json({ success: true });
        } else {
            return Response.json({ success: false, error: "Unknown action" }, { status: 400 });
        }

    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}