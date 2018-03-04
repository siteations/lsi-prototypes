const hex = { '°':'&#x00B0;',
  '½':'&#x00BD;',
  'Á':'&#x00C1;',
  'É':'&#x00C9;',
  'Î':'&#x00CE;',
  'Ô':'&#x00D4;',
  '×':'&#x00D7;',
  'à':'&#x00E0;',
  'á':'&#x00E1;',
  'â':'&#x00E2;',
  'ã':'&#x00E3;',
  'ä':'&#x00E4;',
  'å':'&#x00E5;',
  'æ':'&#x00E6;',
  'ç':'&#x00E7;',
  'è':'&#x00E8;',
  'é':'&#x00E9;',
  'ê':'&#x00EA;',
  'ë':'&#x00EB;',
  'ì':'&#x00EC;',
  'í':'&#x00ED;',
  'î':'&#x00EE;',
  'ï':'&#x00EF;',
  'ò':'&#x00F2;',
  'ó':'&#x00F3;',
  'ô':'&#x00F4;',
  'ö':'&#x00F6;',
  'ú':'&#x00FA;',
  'ü':'&#x00FC;',
  'ō':'&#x014D;',
  'ū':'&#x016B;',
  '–':'&#x2013;',
  '—':'&#x2014;',
  '…':'&#x2026;',
  '′':'&#x2032;',
  '″':'&#x2033;' }


const hexi = Object.values(hex);
const utf = Object.keys(hex);


const convertName = function(para){
    var adjPara = para;

    hexi.forEach((hexcode, i)=>{
      var hexReg = new RegExp(hexcode, 'g');
      adjPara = adjPara.replace(hexReg, utf[i]);
    })

		return adjPara;

}

export default convertName;
