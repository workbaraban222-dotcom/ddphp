<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

$dbFile = __DIR__ . '/../../data/db.json';

function read_db($file) {
  if (!file_exists($file)) {
    return [];
  }
  $raw = file_get_contents($file);
  if ($raw === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Cannot read database'], JSON_UNESCAPED_UNICODE);
    exit;
  }
  $raw = preg_replace('/^\xEF\xBB\xBF/', '', $raw);
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

function write_db($file, $data) {
  $dir = dirname($file);
  if (!is_dir($dir)) {
    mkdir($dir, 0775, true);
  }
  $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  if ($json === false || file_put_contents($file, $json . PHP_EOL, LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Cannot write database'], JSON_UNESCAPED_UNICODE);
    exit;
  }
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
  echo json_encode(read_db($dbFile), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

if ($method === 'OPTIONS') {
  echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
  exit;
}

if ($method === 'PUT' || $method === 'POST') {
  $body = file_get_contents('php://input');
  $next = json_decode($body ?: '{}', true);
  if (!is_array($next)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON'], JSON_UNESCAPED_UNICODE);
    exit;
  }

  $current = read_db($dbFile);
  $next['orders'] = $current['orders'] ?? ($next['orders'] ?? []);
  $next['partnerLeads'] = $current['partnerLeads'] ?? ($next['partnerLeads'] ?? []);
  write_db($dbFile, $next);
  echo json_encode($next, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
?>
