import Gilpin from './Gilpin.js';

Gilpin.forEach(chapter=>{
	chapter.sites = []
	chapter.paragraphs.forEach((p,i)=>{
		if (p.site !== null){
			var site = p.site[0]
			site.p = i
			chapter.sites.push(site)
		}
	})
})

export default Gilpin;
