export const dtOptions={
    language: {
        search: "بحث: ",
        lengthMenu:"عرض _MENU_ سجلات",
        info:" عرض السجلات من <b>_START_ </b> الى <b>_END_</b> من اصل<b> _TOTAL_</b> سجل",
        infoFiltered:"(فرز من <b>_MAX_</b> سجل)",
        paginate: {
            first: "الاولى",
            previous: "السابق",
            next: "التالي",
            last: "الاخيرة"
        },
    },
    fixedColumns:   true,
   
}
export const monthlyButtonsOptions={
    
    buttons: [
        {
            extend: 'print',
            text: '<i class="fa fa-print fa-lg px-2"></i> طباعة ',
            className:'btn btn-primary',
            customize: function ( win:any ) {
                $(win.document.body)
                    .css('direction','rtl').addClass('cairo-small')


                $(win.document.body).find( 'table' )
                    .addClass( 'compact' )
                    .css( 'font-size', 'inherit' );
                    
                win.document.title=""
                $(win.document.body).find( 'h1' ).css('text-align','center').text('تقرير الحضور والانصراف الاسبوعي من11/7/2021 الى 17/7/2021 ')
                
            }
        },
        {
            extend: 'excel',
            text: '<i class="fa fa-file-excel fa-lg px-2"></i> تصدير اكسل',
            className:'btn btn-primary',
        }
    ]
}