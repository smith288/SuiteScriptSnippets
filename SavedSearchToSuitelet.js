console.clear();

require(['N/record', 'N/search'], function(record, search) {

    var srch = search.load({id: 'customsearch_mytest_search'});

    var srch_filters_str = '', srch_columns_str = '';
    srch.filters.forEach(x=> {
        srch_filters_str += `\n\t\t\t{name:'${x.name}', operator:'${x.operator}'`;
        if(x.join){
            srch_filters_str += `, join: '${x.join}'`
        }
        srch_filters_str += `, values: [REPLACE]},`;
    });
    srch.columns.forEach(x=> {
        srch_columns_str += `\n\t\t\t{name:'${x.name}'`;
        if(x.join){
            srch_columns_str += `, join: '${x.join}'`
        }
        srch_columns_str += `},`;
    });
    
    srch_filters_str = srch_filters_str.substring(0,srch_filters_str.length-1);
    srch_columns_str = srch_columns_str.substring(0,srch_columns_str.length-1);
    var srch_str = `var srch = search.create(\n\t{type: '${srch.searchType}',\n\t\t filters: [${srch_filters_str}], \n\t\tcolumns: [${srch_columns_str}]\n});`;
    console.log(srch_str);

});
