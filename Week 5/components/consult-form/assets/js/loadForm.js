function loadComponent(selector, path) {
    fetch(path)
        .then(response => response.text())
        .then(data => {
            const element = document.querySelector(selector);
            
            if (element) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = data;

                // Di chuyển các thẻ <link> vào <head>
                const links = tempDiv.querySelectorAll("link[rel='stylesheet']");
                links.forEach(link => {
                    // Kiểm tra xem link với href này đã tồn tại chưa
                    if (!document.querySelector(`link[href="${link.getAttribute('href')}"]`)) {
                        document.head.appendChild(link.cloneNode(true));
                    }
                    link.remove();
                });

                element.innerHTML = tempDiv.innerHTML;
            }
        })
        .catch(error => console.error(`Error loading ${path}:`, error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent(".consult-form", "../../components/consult-form/consult-form.xml");
});