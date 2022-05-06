/*
This will allow the require to work and perform the conversion to the Suitelet.

Directions: 
Run this snippet in the console of a browser in a Transaction record or the Netsuite debugger using the 2.1 version.  

Limitations:
Saved search don't contain the values of which are saved within the saved search so I can only provide a placeholder that you must fill out yourself when you wish to utilize the search.
*/
if(!log){
    log = console.log;
    console.clear();
}


require(['N/record', 'N/search'], function(record, search) {

    try {
        
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
        
        log.debug('SuiteScript', srch_str);
    } catch (err) {
        if(err.name == 'INVALID_SEARCH'){
            log.error('That search does not exist');
        }
    }
    

});
