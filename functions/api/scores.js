export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const { action } = body;

        // Action 1: Public POST (Submit Score)
        if (action === "submit") {
            const { name, id, category, score } = body;

            if (!name || !id || !category || score === undefined) {
                return Response.json({ success: false, error: "Missing fields" }, { status: 400 });
            }

            // Insert score
            await context.env.DB.prepare(
                "INSERT INTO scores (category, player_name, player_id, score) VALUES (?, ?, ?, ?)"
            ).bind(category, name, id, score).run();

            // Fetch Top 5 for this category
            const { results } = await context.env.DB.prepare(
                "SELECT player_name as name, category, score FROM scores WHERE category = ? ORDER BY score DESC, timestamp ASC LIMIT 5"
            ).bind(category).all();

            return Response.json({ success: true, topScores: results });
        }

        // Admin Actions...
        const { adminKey } = body;
        if (!adminKey) return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { results: adminSettings } = await context.env.DB.prepare(
            "SELECT master_key FROM admin_settings WHERE id = 1"
        ).all();

        const MASTER_ADMIN_KEY = adminSettings.length > 0 ? adminSettings[0].master_key : "super_secret_admin_key_123";

        if (adminKey !== MASTER_ADMIN_KEY) {
            return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        if (action === "fetch_scores") {
            const { category } = body;
            if (!category) return Response.json({ success: false, error: "Category missing" }, { status: 400 });

            const { results } = await context.env.DB.prepare(
                "SELECT * FROM scores WHERE category = ? ORDER BY score DESC, timestamp ASC"
            ).bind(category).all();
            return Response.json({ success: true, scores: results });

        } else if (action === "delete_scores") {
            const { category } = body;
            if (!category) return Response.json({ success: false, error: "Category missing" }, { status: 400 });

            // Delete scores
            await context.env.DB.prepare(
                "DELETE FROM scores WHERE category = ?"
            ).bind(category).run();

            // Clear password
            await context.env.DB.prepare(
                "UPDATE categories SET quiz_password = '' WHERE code = ?"
            ).bind(category).run();

            return Response.json({ success: true });
        }

        return Response.json({ success: false, error: "Unknown action" }, { status: 400 });

    } catch (err) {
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}
