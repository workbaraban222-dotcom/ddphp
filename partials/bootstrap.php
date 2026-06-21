<?php
if (!headers_sent()) {
  header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
  header('Pragma: no-cache');
  header('Expires: 0');
}

function dd_json_file() {
  return __DIR__ . '/../data/db.json';
}

function dd_read_json() {
  $file = dd_json_file();
  if (!file_exists($file)) {
    return new stdClass();
  }
  $raw = file_get_contents($file);
  if ($raw === false) {
    return new stdClass();
  }
  $raw = preg_replace('/^\xEF\xBB\xBF/', '', $raw);
  $data = json_decode($raw, true);
  return is_array($data) ? $data : new stdClass();
}

function dd_bootstrap_script() {
  $json = json_encode(dd_read_json(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  if (!$json) {
    $json = 'null';
  }
  echo '<script>window.__DD_SERVER_DATA__=' . str_replace('</script', '<\/script', $json) . ';</script>' . PHP_EOL;
}
?>
