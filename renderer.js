window.onload = () => {
    const cat = document.getElementById('cat');

    document.addEventListener('mousemove', (event) => {
        cat.style.left = event.pageX + 'px';
        cat.style.top = event.pageY + 'px';
    });
};
