$(document).ready(function(){
    let Iam,
        Index;
    $('.button').click(function() {
        Iam=$(this);
        Index=Iam.closest('.wrap').find('.button').index(Iam);
        ShowHideBlocks();
    })
    function ShowHideBlocks() {
        Iam.closest('.block').find('.contaner').removeClass('active ');
        Iam.closest('.block').find('.contaner').eq(Index).addClass('active');

    }
})
