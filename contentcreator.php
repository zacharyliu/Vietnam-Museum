<?php

class ContentCreator {
	
	private $menu = Array();
	
	private function setDefaults($options = Array(), $defaults = Array()) {
		foreach ($defaults as $name => $value) {
			if (!array_key_exists($name, $options) || $options[$name] == '') {
				$options[$name] = $value;
			}
		}
		return $options;
	}
    
    private function shortnameToID($shortname) {
        return htmlspecialchars(strtolower(str_replace(' ', '-', $shortname)));
    }
	
	private function createTopic($options = null) {
        if ($options['shortname'] == '') $options['shortname'] = $options['title'];
        
        $id = $this->shortnameToID($options['shortname']);
		$output = '<div class="tile" id="' . $id . '" data-shortname="' . $options['shortname'] .'">';
        $output .= '<div class="tile_container"><a class="tile_inner" href="#' . $id . '">';
        $output .= '<div class="tile_image_wrapper"><img class="tile_image" src="' . site_url('images/' . $options['bg']) . '"></img></div>';
		$output .= '<h3>' . $options['title'] . '</h3>';
        //$output .= '<p>' . $options['summary'] . '</p>';
        $output .= '</a><div class="content">';
		$output .= $options['content'];
		$output .= '</div></div></div>';
		
		return $output;
	}
	
	private function createSection($options = null) {
        if ($options['shortname'] == '') $options['shortname'] = $options['title'];
        
	    $defaults = Array('height' => 'auto', 'content' => '', 'background' => '', 'speed' => '0.2');
        $options = $this->setDefaults($options, $defaults);
        
		if ($options['background'] != '') {
			$background = ' background-image: url(' . site_url('images/' . $options['background']) . ');';
		} else {
			$background = '';
		}
		
		if ($options['height'] != 'auto') {
			$height = 'height: ' . $options['height'] . 'px;';
		} else {
			$height = 'height: auto;';
		}
		
		$output = '<h4 id="' . $this->shortnameToID($options['shortname']) . '" data-shortname="' . $options['shortname'] .'">' . $options['title'] . '</h4>';
		$output .= $options['content'];
		
		return $output;
	}
    
    private function createContent($options, $output) {
        $content = '<div id="hero_wrapper"><div id="hero" style="background-image:url(' . site_url('images/' . $options['bg']) . ');"><div id="hero_inner">';
        $content .= '<h2>' . $options['title'] . '</h2>'; // page title
        $content .= '<p>' . $options['summary'] . '</p>'; // page summary
        $content .= '</div></div></div><div id="main">';
        $content .= $output; // tiles
        $content .= '</div>';
        
        return $content;
    }
    
    private function createMenu() {
        $menu = '<ul>';
        foreach ($this->menu as $topic=>$sections) {
            $menu .= '<li><a href="#' . $this->shortnameToID($topic) . '">' . $topic . '</a><ul>';
            foreach ($sections as $section) {
                $menu .= '<li><a href="#' . $this->shortnameToID($section) . '">' . $section . '</a></li>';
            }
            $menu .= '</ul></li>';
        }
        $menu .= '</ul>';
        
        return $menu;
    }
    
    public function createComponent($type, $component) {
        switch ($type) {
            case 'video':
				$output = '<div class="video banner"><div class="video_container"><div class="video_container_inner">';
				$output .= '<iframe src="http://www.youtube.com/embed/'.(string)$component->id.'?wmode=transparent" frameborder="0" allowfullscreen></iframe></div></div>';
				if ((string)$component->caption != '') {
                    $output .= '<span class="caption">' . (string)$component->caption . '</span>';
                }
				$output .= '</div>';
				return $output;
				break;
            
            case 'teamlisting':
                $output = '<div class="component teamlisting_wrapper"><table class="teamlisting"><tbody>';
                foreach ($component->event as $event) {
                    $output .= '<tr><td>' . (string)$event->title . '</td><td>' . (string)$event->members . '</td></tr>';
                }
                $output .= '</tbody></table></div>';
                return $output;
                break;
                
            case 'quote':
                $output = '<div class="component blockquote">';
                foreach ($component->xpath('p') as $line) {
                    $output .= $line->asXML();
                }
                foreach ($component->xpath('author') as $author) {
                    $output .= '<p style="text-align: right">- ' . (string)$author . '</p>';
                }
                $output .= '</div>';
                return $output;
                break;
            
            case 'panorama':
                $output = '<div class="panorama banner">';
                $output .= '<div class="title">' . (string)$component->title . '</div><div class="panorama_inner">';
                $output .= '<img src="' . site_url('images/' . (string)$component->source) . '" height="300"></img>';
                $output .= '</div>';
                if ((string)$component->caption != '') {
                    $output .= '<div class="caption">' . (string)$component->caption . '</div>';
                }
                $output .= '</div>';
                return $output;
                break;
            
            case 'p':
                $output = $component->asXML();
                return $output;
                break;
            
            case 'pwide':
                $output = '<p class="wide">';
                $output .= (string)$component;
                $output .= '</p>';
                return $output;
                break;
            
			case 'xmltree':
                $output = $component;
				return $output;
				break;
            
            case 'image':
                $output = '<div class="banner image' . ($component->float == 'true' ? ' float' : '') . '"' . ($component->speed != '' ? ' data-speed="' . (string)$component->speed . '"' : '') . '>';
                $output .= '<img src="' . site_url('images/' . (string)$component->source) . '" width="' . (string)$component->width . '" height="' . (string)$component->height . '"></img>';
                if ((string)$component->caption != '') {
                    $output .= '<div class="caption">' . (string)$component->caption . '</div>';
                }
                $output .= '</div>';
                return $output;
                break;
				
			case 'citationlist':
                $output = '<div class="component teamlisting_wrapper citations"><table class="teamlisting"><tbody>';
                foreach ($component->citation as $citation) {
                    $output .= '<tr><td>' . (string)$citation . '</td></tr>';
                }
                $output .= '</tbody></table></div>';
                return $output;
                break;
				
			case 'spacer':
				$output = '<div class="spacer" style="height: '.$component.'px;"></div>';
				return $output;
				break;
                
            default:
                return $component->asXML();
                break;
        }
    }
	
	public function loadContent($section) {
		global $alias;
		global $sections;
		$sectionStyles = array();
		foreach($sections as $sec)
			$sectionStyles[] = ($section == $sec) ? ' class="active"' : '';
		$fileList = scandir('content/'.$section);
        $the_content = $this->renderFromXML('content/'.$section.'/index.xml');
        
        $menu = $this->createMenu();
        
        if ($section == "template") {
            require('content/template/index.php');
            exit();
        }
		
        require('content/template/index.php');
	}
	
	public function renderFromXML($filename) {
		$xml = simplexml_load_file($filename);
		$output = '';
		foreach ($xml->topics->topic as $topic) {
		    $this->menu[(string)$topic->shortname] = Array();
			$topic_options['title'] = $topic->title;
			$topic_options['shortname'] = $topic->shortname;
            $topic_options['bg'] = $topic->bg;
            $topic_options['summary'] = $topic->summary;
			$topic_options['content'] = '';
			
			foreach ($topic->section as $section) {
			    $this->menu[(string)$topic->shortname][] = $section->shortname;
				$section_options['title'] = $section->title;
				$section_options['shortname'] = $section->shortname;
				$section_options['height'] = $section->height;
				$section_options['background'] = $section->background;
				$section_options['speed'] = $section->bgspeed;
				$section_options['content'] = '';
				
                $content = $section->content->xpath('*');
                
                foreach ($content as $component) {
                    $type = $component->getName();
                    $section_options['content'] .= $this->createComponent($type, $component);
                }
				
				$topic_options['content'] .= $this->createSection($section_options);
			}
			
			$output .= $this->createTopic($topic_options);
		}
        
        $content_options = Array('title' => $xml->title, 'summary' => $xml->summary, 'bg' => $xml->bg);
        $content = $this->createContent($content_options, $output);
		return $content;
	}
}

?>