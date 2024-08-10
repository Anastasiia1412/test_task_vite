//всплывашка модального окна

export function showModal(success, text) {
    if (success) {
        document.getElementById('modal-header-status').innerHTML = "SUCCESS"
        // document.getElementById('modal-header-link').innerHTML = text
        // document.getElementById('modal-header-link').href = text
    }
    else {
        document.getElementById('modal-header-status').innerHTML = "ERROR"
    }

    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}