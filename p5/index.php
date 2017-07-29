<?php

$src = $_GET['src'];
$path = 'sketches/'.$src.'.js';

if(!file_exists($path)) exit;

$svgMode = isset($_GET['svg']);

?>

<html>
	<head>
		<meta charset="UTF-8">
		<style> body {padding: 0; margin: 0;} </style>
	</head>
	<body>
		<script type="text/javascript" src="p5.min.js"></script>
		<script type="text/javascript" src="p5.dom.js"></script>
		<?php if($svgMode): ?>
		<script type="text/javascript" src="p5.svg.js"></script>
		<?php endif; ?>
		<script type="text/javascript" src="libraries/p5.functions.js"></script>
		<script type="text/javascript" src="libraries/resize.js"></script>
		<script type="text/javascript" src="libraries/processing-port.js"></script>
		<script type="text/javascript" src="libraries/ka-port.js"></script>
		<?php
		foreach(array_keys($_GET) as $library){
			$library_path = 'libraries/'.$library.'.js';
			if($library != 'src' && file_exists($library_path)) echo "<script src='$library_path'></script>";
		}
		?>
		<!--<script src="<?php echo $path; ?>"></script>-->
		<script>
p5.setup(function() {
	<?php if($svgMode): ?>
	createCanvas(400, 400, SVG);
	<?php endif; ?>
	<?php echo "\n".file_get_contents($path)."\n"; ?>
});
		</script>
	</body>
</html>