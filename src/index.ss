:root {
  --bg: #f4f6fb;
  --surface: #ffffff;
  --surface-2: #eef2f9;
  --text: #0f1e3d;
  --text-muted: #5b6b8c;
  --border: #d9e0ee;
  --primary: #143a7a;
  --primary-hover: #1c4fa1;
  --accent: #2f7dfa;
  --success: #1f9d55;
  --danger: #c0392b;
  --shadow: 0 4px 14px rgba(15, 30, 61, 0.08);
  --radius: 12px;
}

[data-theme='dark'] {
  --bg: #0d1526;
  --surface: #16203a;
  --surface-2: #1d2a4a;
  --text: #eaf0ff;
  --text-muted: #9aabcf;
  --border: #263457;
  --primary: #3d6ede;
  --primary-hover: #5585ec;
  --accent: #6ea8ff;
  --success: #35c17b;
  --danger: #ef6a5c;
  --shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  transition: background 0.25s ease, color 0.25s ease;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}