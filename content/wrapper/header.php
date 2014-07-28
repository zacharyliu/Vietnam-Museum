<!DOCTYPE html>
<html>
	<head>
		<title>HTHS Webmaster 2011-2012 :: <?php echo $alias[$section]; ?></title>
		<script type="text/javascript" src="<?php echo site_url('js/jquery-1.7.1.min.js') ?>"></script>
		<!--<script type="text/javascript" src="<?php echo site_url('js/cssfx.min.js')?>"></script>-->
		<script type="text/javascript" src="<?php echo site_url('js/dragscrollable.js')?>"></script>
		<script type="text/javascript" src="<?php echo site_url('js/jquery.scrollTo-1.4.2-min.js')?>"></script>
		<script type="text/javascript" src="<?php echo site_url('js/jquery.localscroll-1.2.7-min.js')?>"></script>
		<script type="text/javascript" src="<?php echo site_url('js/main.js')?>"></script>
		<link rel="stylesheet" type="text/css" href="<?php echo site_url('css/main.css')?>" class="cssfx"></link>
		<link rel="icon" type="image/ico" href="favicon.ico"></link>
		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-30018576-1']);
			_gaq.push(['_trackPageview']);

			(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
		<!-- Start of Woopra Code -->
        <script type="text/javascript">
        function woopraReady(tracker) {
            tracker.setDomain('hthswebteam.com');
            tracker.setIdleTimeout(300000);
            tracker.track();
            return false;
        }
        (function() {
            var wsc = document.createElement('script');
            wsc.src = document.location.protocol+'//static.woopra.com/js/woopra.js';
            wsc.type = 'text/javascript';
            wsc.async = true;
            var ssc = document.getElementsByTagName('script')[0];
            ssc.parentNode.insertBefore(wsc, ssc);
        })();
        </script>
        <!-- End of Woopra Code -->
	</head>
</html>
<body>
<div id="navbar">
<div id="navbar_inner">
	<h1>HTHS Webmaster 2012</h1>
	<ul>
		<li><a href="<?php echo site_url('teched')?>" <?php echo $sectionStyles[0] ?>>Tech Ed</a></li>
		<li><a href="<?php echo site_url('tsa')?>" <?php echo $sectionStyles[1] ?>>TSA Chapter</a></li>
		<li><a href="<?php echo site_url('db')?>" <?php echo $sectionStyles[2] ?>>Design Brief</a></li>
		<li><a href="<?php echo site_url('colophon')?>" <?php echo $sectionStyles[3] ?>>Site Info</a></li>
	</ul>
</div>
</div>
<div id="content_wrapper">
<div id="column_left">
	<div id="navbar_fixed">
		<?php
		if (isset($menu)) {
		    echo $menu;
		}
        ?>
	</div>
</div>
<div id="column_middle_shadow"></div>
<div id="column_middle">