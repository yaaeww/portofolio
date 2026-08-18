export type Difficulty = "easy" | "medium" | "hard";

export interface GameState {
  difficulty: Difficulty;
  targetText: string;
  typedText: string;
  startTime: number | null;
  timeLimit: number;
  finished: boolean;
}

export interface GameResult {
  wpm: number;
  accuracy: number;
  time: number;
  correctChars: number;
  totalChars: number;
}

const CODE_SNIPPETS: Record<Difficulty, string[]> = {
  easy: [
    "func main()",
    "SELECT * FROM users",
    "const app = express()",
    "docker build -t api .",
    "npm install",
    "git push origin main",
    "CREATE TABLE orders",
    "redis-cli GET session",
    "go run server.go",
    "curl -X GET /api/health",
    "export default function",
    "type User struct",
    "interface Repository",
    "INSERT INTO logs VALUES",
    "ALTER TABLE users ADD",
    "pip install pandas",
    "psql -U postgres",
    "cat package.json",
    "chmod +x deploy.sh",
    "echo $DATABASE_URL",
  ],
  medium: [
    "func main() {\n\tfmt.Println(\"Hello\")\n}",
    "SELECT u.name, COUNT(o.id)\nFROM users u\nJOIN orders o ON u.id = o.user_id\nGROUP BY u.name;",
    "app.get(\"/api/users\", async (req, res) => {\n\tconst users = await db.query(\"SELECT *\");\n\tres.json(users);\n});",
    "docker-compose up -d\ndocker logs -f api-container\ndocker exec -it api bash",
    "type User struct {\n\tID    int\n\tName  string\n\tEmail string\n}",
    "func (s *Server) HandleRequest(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(http.StatusOK)\n}",
    "export default function Terminal() {\n\tconst [lines, setLines] = useState([]);\n\treturn <div>{lines}</div>;\n}",
    "const cache = new Redis({ host: \"localhost\", port: 6379 });\nawait cache.set(key, value, \"EX\", 3600);",
    "CREATE TABLE certificates (\n\tid SERIAL PRIMARY KEY,\n\ttitle VARCHAR(255) NOT NULL,\n\tissuer VARCHAR(255)\n);",
    "func middleware(next http.Handler) http.Handler {\n\treturn http.HandlerFunc(func(w, r) {\n\t\tnext.ServeHTTP(w, r)\n\t})\n}",
  ],
  hard: [
    "func (s *Server) Start(addr string) error {\n\tsrv := &http.Server{\n\t\tAddr:    addr,\n\t\tHandler: s.router,\n\t}\n\treturn srv.ListenAndServe()\n}",
    "const rateLimiter = func(next http.Handler) http.Handler {\n\treturn http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tif !limiter.Allow() {\n\t\t\thttp.Error(w, \"Rate limited\", 429)\n\t\t\treturn\n\t\t}\n\t\tnext.ServeHTTP(w, r)\n\t})\n}",
    "async function processPayment(order: Order): Promise<Result> {\n\tconst client = await pool.connect();\n\ttry {\n\t\tawait client.query(\"BEGIN\");\n\t\tconst result = await chargeCard(order.total);\n\t\tawait client.query(\"UPDATE orders SET paid = $1\", [result.id]);\n\t\tawait client.query(\"COMMIT\");\n\t\treturn { ok: true, transactionId: result.id };\n\t} catch (err) {\n\t\tawait client.query(\"ROLLBACK\");\n\t\treturn { ok: false, error: err.message };\n\t} finally {\n\t\tclient.release();\n\t}\n}",
    "WITH RECURSIVE affiliate_tree AS (\n\tSELECT id, parent_id, 1 AS level\n\tFROM affiliates WHERE parent_id IS NULL\n\tUNION ALL\n\tSELECT a.id, a.parent_id, at.level + 1\n\tFROM affiliates a\n\tJOIN affiliate_tree at ON a.parent_id = at.id\n\tWHERE at.level < 5\n)\nSELECT * FROM affiliate_tree;",
    "func (r *RedisCache) GetOrSet(key string, ttl time.Duration, fn func() (any, error)) (any, error) {\n\tval, err := r.client.Get(ctx, key).Result();\n\tif err == nil {\n\t\tvar result any\n\t\treturn result, json.Unmarshal([]byte(val), &result)\n\t}\n\tresult, err := fn();\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\tdata, _ := json.Marshal(result)\n\tr.client.Set(ctx, key, data, ttl)\n\treturn result, nil\n}",
  ],
};

export function getRandomSnippet(difficulty: Difficulty): string {
  const snippets = CODE_SNIPPETS[difficulty];
  return snippets[Math.floor(Math.random() * snippets.length)];
}

export function calculateWPM(charsTyped: number, elapsedSeconds: number): number {
  if (elapsedSeconds === 0) return 0;
  const words = charsTyped / 5;
  return Math.round(words / (elapsedSeconds / 60));
}

export function calculateAccuracy(target: string, typed: string): number {
  if (typed.length === 0) return 100;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correct++;
  }
  return Math.round((correct / typed.length) * 100);
}

export function getResult(
  target: string,
  typed: string,
  elapsedSeconds: number,
): GameResult {
  let correctChars = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correctChars++;
  }
  return {
    wpm: calculateWPM(typed.length, elapsedSeconds),
    accuracy: calculateAccuracy(target, typed),
    time: elapsedSeconds,
    correctChars,
    totalChars: target.length,
  };
}

export function getTimeLimit(difficulty: Difficulty): number {
  switch (difficulty) {
    case "easy":
      return 30;
    case "medium":
      return 60;
    case "hard":
      return 90;
  }
}

export { CODE_SNIPPETS };
