function prepareLinksDataForCurves(links) {
    links.forEach(function (link) {

        // find other links with same target+source or source+target


        let same = graphs.links.filter(function (v, i) {
            return ((v.source === link.source && v.target === link.target));
        })
        let sameAlt = graphs.links.filter(function (v, i) {
            return ((v.source === link.target && v.target === link.source));
        })

        let sameAll = same.concat(sameAlt);
        sameAll.forEach(function (s, i) {

            s.sameIndex = (i + 1);
            s.sameTotal = sameAll.length;
            s.sameTotalHalf = (s.sameTotal / 2);
            s.sameUneven = ((s.sameTotal % 2) !== 0);
            s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
            s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
            s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
            s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));

            if (s.sameIndexCorrected === 2) {
                s.sameArcDirection = 1;
            }
        });


    });
    return links
}