/**
 * show / hide the helpSection
 */
function helpBtnClick() {
    document.getElementById('legendTopSection').classList.toggle('hide');
    document.getElementById('legendBottomSection').classList.toggle('hide');
    let legendBtn = document.getElementById('legendBtn');
    if (legendBtn.innerText == 'Show Help') {
        legendBtn.innerText = 'Hide Help';
    } else {
        legendBtn.innerText = 'Show Help';
    }
}