import $ from 'jquery';
import { bitable } from '@base-open/web-api';
// import './index.scss';

$(async function() {

  const off = bitable.base.onSelectionChange(async (event) => {
    // console.log(event);

    if (!event.data.fieldId) {
      return;
    } else {
      let selected_tableId: any = event.data.tableId;
      let selected_recordId: any = event!.data!.recordId;
      let selected_fieldId: any = event!.data!.fieldId;

      const table = await bitable.base.getTableById(selected_tableId);
      const valueList: any = await table.getCellValue(selected_fieldId, selected_recordId);

      let carousel: any = <HTMLElement>document.querySelector("#carousel");
      carousel.innerHTML = "";
      for (const value_item of valueList) {
        // console.log(value_item);
        let type = value_item.type;
        let main_type = type.split("/")[0];
        // console.log(main_type);

        if (main_type === 'image') {
          const url = await table.getAttachmentUrl(value_item.token, selected_fieldId, selected_recordId);
          addImage(url);
          window.firstImg = carousel.querySelectorAll('img')[0];
        }
      }

    }
  })

  function addImage(imgUrl: any) {
    let carousel: any = <HTMLElement>document.querySelector("#carousel");
    var img = document.createElement("img");
    img.src = imgUrl;
    carousel.appendChild(img);
  }

});