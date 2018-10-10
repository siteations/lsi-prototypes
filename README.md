# UVA Landscape Studies Initiative prototype interface

### Warning: this is a front-end demo of limited text features. It uses updated, local data but needs updates to connect with IATH servers for fieldwork and the cleaned results of xml processing. Brittle and Brute Force. 

### Inspiration / Precedents - paneled DH projects
+ [Enchanting the Desert](http://www.enchantingthedesert.com/home/) *with layered/annotated imagery and maps to come as production of pilot courses*
+ [American Panorama](http://dsl.richmond.edu/panorama/) *with radically different data given the survey structure*

# Prototype Structure
### node.js / npm packaging with react front-end framework
+ [node](https://nodejs.org/)
+ [react](https://reactjs.org/)
+ [redux](https://redux.js.org/)
+ [react-routing](https://reacttraining.com/react-router/)


** Latest build **  - demo here at [Github siteations](https://siteations.github.io/uva-lsi/)
** Post-Transfer Location ** - demo anticipated at [Github UVA-IATH](https://UVA-IATH.github.io/uva-lsi/) if hosted on github

### Core Development Structures to Note: 

*built with 'create-react-app'* - if this prototype is used to create the long-term front-end for the IATH drupal installations, the first step is to eject from the project and set-up routing.
+ see ['create-react-app'](https://github.com/facebook/create-react-app) for ejection instructions
+ see this [medium guide] (https://medium.com/@Userium/headless-drupal-build-a-drupal-8-api-with-a-reactjs-front-end-e43bf0fb94db) and others from drupal-react headless integration 
+ alternately just rebuild desired features in drupal using views 

*also holds miscellaneous data cleaning scripts for xml* - this respository has also hosted: 
+ my informal scripts for updating the xml chapters - see **textPrep > utilityScripts** 
+ linking to svn and hosting the original chapters from Elizabeth Barlow Rogers - see **textPrep > svn Landscape Design** 
+ copies of the chapter xml - as tweaked for reading with 'targets' instead of 'keys' - are in **public > chapters** as well as the build folders - **docs > chapters** . These are the working version read by the react code; do not delete if you want the demo to run. *the DSI students are working on the xml for all chapters outside 7 and 9 pilots and are using the files on box.net*


# Core Elements and next steps 
## following code is held in the 'src' folder
*pardon general notes, writing from a non-developer audience*

### App starts from index.js (holding App.js) and store.js
+ do not delete or all functionlity will cease
+ index > app directs the code to pull in different elements from components - these 'components' are basically framework that gets consolidated into one giant file of javascript and html on running 'npm run build'
+ short translation - index and App hold the hierarchy of pieces that pull together the data (being handled in store > action-creators and data) and visual styling (in css and fonts)
+ **store.js** holds the major redux connection that links to the action-creators' verbose and explicit handing of data. Currently this is built around the local data files and reading the xml in via action-creators > xmlParsingUtil.js . All the build out happens and this is connected to function databases/back-end many of the redux action-creators will need to be ammended to do database calls (via axios, etc.)

### data - any extracted data from the xml or new files
+ all files starting with **'07' or '09' are based on the updated xml tagging for pilot chapters**  *the DSI students are working on the xml for all chapters outside 7 and 9 pilots and will produce parallel data seeding files for those chapters*
+ all files starting with **'imageList'** are based on Elizabeth Barlow Rogers' images from the Foundation for Landscape Studies and incorporate geotagging by site for later geographic use. For the full csv file, use to generate these lists see textPrep > Lists > images_FLS_LocationsInventoryUTF8_tab.csv 
+ the main image file - currently in place of db entries - is **'imageList_chapterSorting.js'** *Chapters 0-7,9 have been checked. File needs updates for 8, 10 on and rotation notes have only been done for chapter 7 - the initial pilot* 
+ all files starting with **'imageObj'** are simply the results of filtering the extensive image list by sites in chapter 7 and 9. This is automated and, because all tags *still need normalization*, is not a full-proof set of images by site.
+ dbStructures folder just holds the initial sketch javascript notes for mocking-up the database, circa January 2018... needs another round of re-design and atomization in feedback with Muskau course activity / field materials

### css - styling files
+ **App.css** holds any custom styling
+ background.jpg is linked in App.css
+ all other css files support the various npm installed code libraries *best not to delete*

### fonts - font, icon, etc. files
+ all fonts linked to by the custom styling, using @font-face *best not to delete*

### components - the core jsx (html&js) structures
+ from **App.js** the stucture is as follows
+ most background data loads when the index loads... start there if loading is very slow - uses a number of zotero calls in the action-creator > resActions.js
+ header = **Search.js** *placeholder for searching, not yet linked - needs database to populate terms* & **ChapterNav.js** *holds the cascading options drawer that opens at the right - works with existing xml, but needs debugged*
+ main space = **CorePane.js** *large panel at left - see later notes to sub-components within* & **AccordPane.js** *holds the two small side panels at the right - see later notes to sub-components*
+ main space with expanded window = **FullPane.js** *this hold basically what the core pane does, but for larger preview. buggy interactions at the moment - need to tabs actions and tweak css. do not use*
+ footer = simple inline materials. *add or alter as design dictates*
---

#### within components - navigation components and misc extra files
+ **ContentsM.js** = container to sort what shows as CorePane content, based on stored data in this.props.nav 
+ **SImage.js, SNetwork.js, SImage.js, SText.js** = container to sort what shows as AccordPane content, based on stored data in this.props.nav 
+ **Tabs.js** = the tabs for moving between sub-panes in the three views of CorePane and AccordPane
+ **EnlargeFull.js** holds to arrows to shift side panels to the main left pane. works with stored data in this.props.nav EnlargeSide.js is a variant
+ **materialStyles.js** holds some misc styling for the material-ui library
+ **ImageGallery.js** holds the simple click-thru gallery structures *debug height variable on captions as disappear with site-driven galleries*
---

#### within components - overall structure of panels holding materials, like text, images, etc.
+ those components to be shown in the main, left pane are noted without a end 'S'. For example TextPane.js will show in the main left panel.
+ those to be shown on right, in top or bottom accordian pane end with an 'S' just like TextPaneS.js . These files are typically less complicated versions due to less anticipated interaction
+ This rule follows for **GeoPane, ImagePane, NetworkPane, ResourcePane, TextPane, ThemePane** 
+ *ThemePanes are currently empty - anticipated use with results of fieldwork and its tagging*
+ *GeoPanes are using an older library (mapbox-gl) and should be updated to both incorporate geotagged imagery and gis on-line materials using the leaflet-react library. See students prototyping tests from the summer*
---

#### within components - main elements (which beg to be refactored)
+ **TextPane.js** holds the body of Rogers' text as well as the notes for each chapter. It reads in a layered text object from this.props.nav.text that holds a pre-sorted version of the xml - working from the paragraph level - thanks for action-creators > xmlParsingUtil.js . *This uses much too much regEx and the interface could be simplifed to use a straight forward text read-out without the left-hand side links. More broadly, there are a number of internal fuctions - to follow links, to go to specific paragraphs, etc. that are nested here and should be simplified. The 'shouldComponentUpdate' function could really use from work to avoid re-rendering the virtual DOM so much. The core issue to debug -for speed and general stability - are here and in the ChapterNav component. More generally the RAs this summer sketched different reader ideas - especially for dual language students and student-use accounts - these ideas should be considered facing any update to resActions.js, the TextPane.js and ResourcePane.js components.*
  + the main panel of text also load **SideLinks.js**  for the left column
+ **GeoPane / GeoPaneS.js** - geographies in general. *as noted above, needs overhaul for alternate library use and connection with LSI library esri-online files*
+ **ImagePane / ImagePaneS.js** - images, whether loaded by site or by figures in the text *see comment below on ImageGallery*
  + this pulls in the ImageGallery.js *together need to udate/troubleshoot css and js for rotating images, as well as updating date to reflect orientation. all image data itself needs updates for the fieldwork drupal site and iiif server location of hosted data*
+ **NetworkPane / NetworkPaneS.js** - currently this just passes data to TestNetwork.js which can be updated *has only been tested in the site position thanks to css position of EnlargeFull needing debugged when working with svg*
  + TestNetwork.js *needs the d3 tweaked for legibility and currently only link to 1-degree of data through action-creators > agentActions.js . That said the DSI students are set to rethink how to navigation and visualization of network can be functional*
---

### action-creators - the core js for filtering data (and later for calls to db)
from App.js the stucture is as follows
+ most background data loads when the index loads... start there if loading is very slow - uses a number of zotero calls in the action-creators > resActions.js *planned on updating the zotero remote database(s), specifically adding revised tags via CLI 'post' calls - this has not been done, but it would be the easiest to do programmatically instead of manually - talk with IATH once tags are more fleshed out*
+ all action-creators are collected in  **rootReducer.js** - so all the different calls to database / zotero / esri / etc. are linked through this structure and the store
+ as a general principle every action-reducer (using redux) is set to enable a one directional flow of data as follows *ignore if familiar with redux in front-end frameworks or data loading ia templated html/php in cms's*
  + the front-end component requests something based on as interaction
  + this calls an function that in imported from that specific action-reducer and wrapped in dispatch (like a cab dispatcher, dispatch is used to call for and pull in new data)
  + in the action reducer itself, this function is called and its' result is sent to an second function that logs this new info in an action object - holding the new data and a required variable for the core action
  + this action object is then registered in an update to the store that passes along the new data and, once on the store, makes it available as read-only
+ the redux system is designed to a) only update the background store data through controlled interactins and b) also make that store available to as many components as desired - *if/as the database is hooked into the application, it is in the action-creators that those calls will be initiated*
+ Before connecting postgreSQL or Drupal mySQL databases: *database design needs review and updating and data from xml entity recognition needs to be normalized*
---

#### within action-creators - misc extra / processing files
+ **xmlParsingUtil.js** = asynchronous reader of xml that creates a more hierarchical object with the text nested by chapter, section, paragraph, and notes. Very quirky and brute force but central to the entire structure. *dear lord please refactor this and use more efficient regEx. Alternately, see the comments in the TextPane component and redesign to avoid the asynchronous structure.*
+ **hexConversion.js** = this reads text and deals with converting the old xml hexcodes into accents and non-english extended punctuation. *really this should be done during xml cleaning, but this is fine for dealing with old, old browser compatability and non-UTF8 standards in the original xml conversion process*
---

#### within action-creators - actual action handing files
+ **agentActions.js** = this loads the current chapter 07 and 09agent_ulan.js / 07 and 09association.js files and provides simple actions to load this data as lists of relevant agents and agent networks. Currently has functions to reformat associations into node and link networks for d3, but need to update use to set different degrees (set at 3 now) *as with all other action-creactor files, replace the local data with database calls after uploading data structure and normalizing/seeding data.*
+ **imgActions.js** = this loads all the identified figure images from imageList_chapterSorting.js and losely identified site images for chp 07 ad 09 from imgObj_chpSites.js . Provides simple actions to load this data as arrays to be read by the ImageGallery component and actions to switch between figure or site-based imagery. *as with all other action-creactor files, replace the local data with database calls after uploading data structure and normalizing/seeding data. generally, we've discussed holding images, video, and all other media as a subset of resources more generally. For quick and dirty testing, this structure can be kept, but it should be discussed with IATH whether/if/how we want to weave these references, like the text references, through zotero to consolidate resources. Even if images are kept seperate for the moment, the fieldwork needs to be added to these datasets - which means getting the address of the IATH iiif server and drupal descriptions if we want to test prototype with the spring course.*
+ **navActions.js** = this loads all the core text from xml and the xmlParsingUtil.js as well as providing functions that track selected chapter, paragraph and note paragraph referenced, and the hierarchy of headers shown i the left-hand navigation drawer. *as with all other action-creactor files, replace the local data with database calls after updating data structure and normalizing/seeding data. In this case, the main discussion with IATH is whether to handle xml differently, once it's been cleaned, tagged, and updated by the DSI students.*
+ **paneActions.js** = this simply tracks which tab should be open in all the different windows. *consider reworking navigation and tab catageories. see CELA structre for accordian, with prosthetic media and abstractions panel, instead of image & theme above gis, network and custom crafted metabolism (etc.) student won't actually have time to build out complex research projects and tracing more advanced social networks is way beyond survey level or the type of data the project has time to imput*
+ **resActions.js** = this reads through the 07 and 09resources_post-zotero.js to identify digitally available resources that have been logged in zotero. It then logs a subset of resource links, by chapter, based on what the user is reading *as with all other action-creactor files, replace the local data with database calls after updating data structure and normalizing/seeding data. Broadly, this is fine for sorting things currently, but as we get more secondary and annotated materials into zotero, we should consider how to handle text notes, digital resources, and annotated entries which link to worldcat only and whether to consolidate panes/tabs. More generally the RAs this summer sketched different reader ideas - especially for dual language students and student-use accounts - these ideas should be considered facing any update to resActions.js, the TextPane.js and ResourcePane.js components. *
+ **siteActions.js** = this reads through the 07 and 09site_tng.js lists to allow for the realignment of the existing geo component. Ideally, once the fieldwork is logged there should be a general redesign of how the maps work within the interface *So much needs to be done to intergrate the esri materials and make them accessible, any work on this component needs to start with that process. See the GeoPane.js note also and the RAs prototyping ideas for geo interactions based on leaflet-esri*


## Back End Design Overview
+ see IATH notes on the project drive, dating from February 2018... needs another round of re-design and atomization in feedback with Muskau course activity / field materials 
+ see also the github repository under use UVA-IATH called 'lsi-misc' which has a ton of old, in process/cleaning, data

# Under Active Construction! Just Demo-ing!

