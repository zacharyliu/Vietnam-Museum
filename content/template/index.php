<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <title>Vietnam Museum : <?php echo $alias[$section]; ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <meta name="robots" content="noindex">
        <link href="<?=site_url('bootstrap/css/bootstrap.css')?>" rel="stylesheet" media="screen">
        <link href="<?=site_url('bootstrap/css/bootstrap-responsive.css')?>" rel="stylesheet" media="screen">
        <link href="<?=site_url('jquery-ui/css/no-theme/jquery-ui-1.10.2.custom.min.css')?>" rel="stylesheet">
        <link rel="stylesheet" type='text/css' href="<?=site_url('BookBlock/css/style.css')?>">
        <link href='http://fonts.googleapis.com/css?family=Cardo:400,400italic,700' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Merriweather+Sans:400,700' rel='stylesheet' type='text/css'>
        <link href="<?=site_url('css/main2.css')?>" rel="stylesheet">
        <noscript><link href="<?=site_url('css/flat.css')?>" rel="stylesheet"></noscript>
        <link href="<?=site_url('css/flat.css')?>" rel="stylesheet alternate" title="flat">
        <script type="text/javascript" src="<?=site_url('js/jquery-1.9.1.min.js')?>"></script>
        <script type="text/javascript" src="<?=site_url('js/jquery-migrate-1.1.1.min.js')?>"></script>
        <script type="text/javascript" src="<?=site_url('jquery-ui/js/jquery-ui-1.10.2.custom.min.js')?>"></script>
        <script type="text/javascript" src="<?=site_url('bootstrap/js/bootstrap.min.js')?>"></script>
        <script type="text/javascript" src="<?=site_url('js/jquery.isotope.min.js')?>"></script>
        <script type="text/javascript" src="<?=site_url('js/jquery.tools.min.js')?>"></script>
        <script type="text/javascript" src="<?=site_url('js/swipeview.js')?>"></script>
        <script type="text/javascript" src="<?=site_url('js/cssfx.min.js')?>"></script>
        <script type="text/javascript" src="<?=site_url('js/dragscrollable.js')?>"></script>
        <script type="text/javascript" src="<?=site_url('js/main2.js')?>"></script>
    </head>
    <body>
        <div id="wrapper" class="container">
            <div id="header">
                <h1 id="title">Vietnam Museum<br /><small>Sreela Kodali and Zachary Liu</small></h1>
            </div>
            <div id="topnav_container" class="container">
                <div id="topnav" class="navbar">
                    <div id="topnav_inner" class="navbar-inner">
                        <div class="container">
                            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </a>
                            <a class="brand" href="<?=site_url('')?>">Vietnam Museum</a>
                            <div class="nav-collapse collapse">
                                <ul class="nav">
                                    <li<?=$sectionStyles[0]?>><a href="<?php echo site_url('bg')?>">Museum Home</a>
                                    <li<?=$sectionStyles[1]?>><a href="<?php echo site_url('artifacts')?>">Browse Artifacts</a>

                                </ul>
                                <div id="layout" class="pull-right">
                                    <ul class="nav">
                                        <li><a href="#">Switch Layout</a>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <?=$the_content?>
            <div id="modal_bg" class="closable">
                <div id="prev_bg" class="closable">
                    <a id="prev" href="#">
                        <div id="prev_label">&lt;</div>
                    </a>
                </div>
                <div id="modal">
                    <div id="modal_inner"></div>
                </div>
                <div id="next_bg" class="closable">
                    <a id="next" href="#">
                        <div id="next_label">&gt;</div>
                    </a>
                </div>
            </div>
        </div>
    </body>
</html>