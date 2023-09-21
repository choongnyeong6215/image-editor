const fileUpload = document.getElementById('fileUpload');
        const imgBox = document.getElementById('imgBox');
        const ctx = imgBox.getContext('2d');
        
        const imgElement = document.createElement('img');

        let filterUnit = {
            brightness : "%",
            saturate : "%",
            invert : "%",
            blur : "px"
        }

        let filter = [];

        fileUpload.addEventListener('change', () => {
            const imgSrc = URL.createObjectURL(fileUpload.files[0]);

            imgElement.src = imgSrc;

            imgBox.appendChild(imgElement);
        })

        // 업로드 파일 캔버스에 적용
        imgElement.addEventListener('load', () => {
            imgBox.width = imgElement.naturalWidth;
            imgBox.height = imgElement.naturalHeight;

            // 이미지 적용
            render();
        })

        function setFilter(e) {
            let filterId = e.id;
            let filterValue = e.value;

            filter[filterId] = filterValue + filterUnit[filterId];

            console.log(filter);

            // 필터 적용할 변수
            let filterAPply = "";

            for(let key in filter) {
                filterAPply += `${key}(${filter[key]})`;
            }
            console.log(filterAPply);

            ctx.filter = filterAPply.trim();

            render();

            e.nextElementSibling.textContent = filterValue;
        }

        function render() {
            ctx.drawImage(imgElement, 0, 0);
        }