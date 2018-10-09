# UVA Landscape Studies Initiative prototype interface

### Warning: this is a front-end demo of limited text features. It uses updated, local data but needs updates to connect with IATH servers for fieldwork and the cleaned results of xml processing.

### Inspiration / Precedents - paneled DH projects
+ [Enchanting the Desert]() *with layered/annotated imagery and maps to come as production of pilot courses*
+ [American Panorama]() *with radically different data given the survey structure*

# Prototype Structure
### node.js / npm packaging with react front-end framework
+ [node]()
+ [react]()
+ [redux]()
+ [react-routing]()


*Latest build* - demo here at [Github siteations](https://siteations.github.io/uva-lsi/)
*Post-Transfer Location* - demo anticipated at [Github UVA-IATH](https://UVA-IATH.github.io/uva-lsi/) if hosted on github

### Core Development Structures to Note: 

*built with 'create-react-app'* - if this prototype is used to create the long-term front-end for the IATH drupal installations, the first step is to eject from the project and set-up routing.
+ see ['create-react-app'](https://github.com/facebook/create-react-app) for ejection instructions
+ see this [medium guide] (https://medium.com/@Userium/headless-drupal-build-a-drupal-8-api-with-a-reactjs-front-end-e43bf0fb94db) and others from drupal-react headless integration 
+ alternately just rebuild desired features in drupal using views 

*also holds miscellaneous data cleaning scripts for xml* - this respository has also hosted: 
+ my informal scripts for updating the xml chapters - see textPrep > utilityScripts
+ linking to svn and hosting the original chapters from Elizabeth Barlow Rogers - see textPrep > svn Landscape Design
+ copies of the chapter xml - as tweaked for reading with 'targets' instead of 'keys' - are in public > chapters as well as the build folders - docs > chapters. These are the working version read by the react code; do not delete if you want the demo to run


# Core Elements and next steps 
## following code is held in the 'src' folder
*pardon general notes, writing from a non-developer audience*

### App starts from index.js (holding App.js) and store.js
+ do not delete or all functionlity will cease
+ index > app directs the code to pull in different elements from components - these 'components' are basically framework that gets consolidated into one giant file of javascript and html on running 'npm run build'
+ short translation - index and App hold the hierarchy of pieces that pull together the data (being handled in store > action-creators and data) and visual styling (in css and fonts)
+ store holds the major redux connection that links to the action-creators' verbose and explicit handing of data. Currently this is built around the local data files and reading the xml in via action-creators > xmlParsingUtil.js . All the build out happens and this is connected to function databases/back-end many of the redux action-creators will need to be ammended to do database calls (via axios, etc.)

### data - any extracted data from the xml or new files
+ all files starting with '07' or '09' are based on the updated xml tagging for pilot chapters
+ all files starting with 'imageList' are based on Elizabeth Barlow Rogers' images from the Foundation for Landscape Studies and incorporate geotagging by site for later geographic use. For the full csv file, use to generate these lists see textPrep > Lists > images_FLS_LocationsInventoryUTF8_tab.csv 
+ the main image file - currently in place of db entries - is 'imageList_chapterSorting.js' *Chapters 0-7,9 have been checked. File needs updates for 8, 10 on and rotation notes have only been done for chapter 7 - the initial pilot* 
+ all files starting with 'imageObj' are simply the results of filtering the extensive image list by sites in chapter 7 and 9. This is automated and, because all tags *still need normalization*, is not a full-proof set of images by site.
+ dbStructures folder just holds the initial sketch javascript notes for mocking-up the database, circa January 2018... needs another round of re-design and atomization in feedback with Muskau course activity / field materials

### css - styling files
+ App.css holds any custom styling
+ background.jpg is linked in App.css
+ all other css files support the various npm installed code libraries *best not to delete*

### fonts - font, icon, etc. files
+ all fonts linked to by the custom styling, using @font-face *best not to delete*

### components - the core jsx (html&js) structures
+ from App.js the stucture is as follows
+ most background data loads when the index loads... start there if loading is very slow - uses a number of zotero calls in the action-creator > resActions.js
+ header = Search.js *placeholder for searching, not yet linked - needs database to populate terms* & ChapterNav.js *holds the cascading options drawer that opens at the right - works with existing xml, but needs debugged*
+ main space = CorePane.js *large panel at left - see later notes to sub-components within* & AccordPane.js *holds the two small side panels at the right - see later notes to sub-components*
+ main space with expanded window = FullPane.js *this hold basically what the core pane does, but for larger preview. buggy interactions at the moment - need to tabs actions and tweak css. do not use*
+ footer = simple inline materials. *add or alter as design dictates*
---

#### within components - navigation components and misc extra files
+ ContentsM.js = container to sort what shows as CorePane content, based on stored data in this.props.nav 
+ SImage.js, SNetwork.js, SImage.js, SText.js = container to sort what shows as AccordPane content, based on stored data in this.props.nav 
+ Tabs.js = the tabs for moving between sub-panes in the three views of CorePane and AccordPane
+ EnlargeFull.js holds to arrows to shift side panels to the main left pane. works with stored data in this.props.nav EnlargeSide.js is a variant
+ materialStyles.js holds some misc styling for the material-ui library
+ ImageGallery.js holds the simple click-thru gallery structures *debug height variable on captions as disappear with site-driven galleries*
---

#### within components - overall structure of panels holding materials, like text, images, etc.
+ those components to be shown in the main, left pane are noted without a end 'S'. For example TextPane.js will show in the main left panel.
+ those to be shown on right, in top or bottom accordian pane end with an 'S' just like TextPaneS.js . These files are typically less complicated versions due to less anticipated interaction
+ This rule follows for GeoPane, ImagePane, NetworkPane, ResourcePane, TextPane, ThemePane 
+ *ThemePanes are currently empty - anticipated use with results of fieldwork and its tagging*
+ *GeoPanes are using an older library (mapbox-gl) and should be updated to both incorporate geotagged imagery and gis on-line materials using the leaflet-react library. See students prototyping tests from the summer*
---



## Back End Design Overview
+ see IATH notes on project drives, circa January 2018... needs another round of re-design and atomization in feedback with Muskau course activity / field materials 

# Under Active Construction! Just Demo-ing!

