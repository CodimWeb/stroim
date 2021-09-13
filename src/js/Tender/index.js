class Tender {
    constructor() {
        this.lotList = [
            {
                categoties: [],
                isShowTable: false,
            }
        ];
        this.activeLotIndex = 0;
    }

    // pushLot = (item) => {
    //     this.lotList.push(item)
    // }

    // removeLot = (index) => {
    //     this.lotList.splice(index, 1)
    // }
    
    render = () => {
        console.log(this.lotList.length)
        var html = '';
        if(this.lotList.length == 1) {
            // пустой лот
            if(this.lotList[0].categoties.length == 0) {
                html = `
                    <div class="nav__content active" id="lot-1" data-index="0">
                        <div class="table table--basket mb-4">
                            <div class="table__head">
                                <div class="table__col table__col--btitle">
                                    Наименование
                                </div>
                                <div class="table__col table__col--bcount">
                                    Кол-во
                                </div>
                                <div class="table__col table__col--bparams">
                                    <div class="table__label table__label--black">Ед. изм</div>
                                </div>
                                <div class="table__col table__col--bsize">
                                    <div class="table__label table__label--black">Размер</div>
                                    <div class="table__label">Толщина/Размер</div>
                                </div>
                                <div class="table__col table__col--bwidth">
                                    <div class="table__label table__label--black">Длина</div>
                                    <div class="table__label">Х ширина</div>
                                </div>
                                <div class="table__col table__col--bsteel">
                                    <div class="table__label table__label--black">Сталь</div>
                                </div>
                                <div class="table__col table__col--bprice">
                                    <div class="table__label table__label--black">Цена</div>
                                    <div class="table__label">Не больше</div>
                                </div>
                                <div class="table__col table__col--bnote">
                                    <div class="table__label table__label--black">Примечание</div>
                                </div>
                            </div>
                            <div class="table__body">
                                <div class="table__row">
                                    <div class="table__col">
                                        <p class="p xs text-gray pt-1 pb-1">Выберите интересующие Вас позиции (слева)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="info-block basket__info-block mb-4">
                            <div class="info-block__icon info-block__icon--small">
                                <img src="img/info.svg" alt="">
                            </div>
                            <div class="info-block__text">
                                <h5 class="mb-2">Внимание!</h5>
                                <ul>
                                    <li><em>— если у Вас несколько позиций, заполните поля «кол-во» «размер» «сталь»</em></li>
                                    <li><em>— если позиций много, просто выберете виды сортамента и прикрепите файл со списком
                                        <br>снизу станицы</em></li>
                                </ul>
                            </div>
                        </div>

                        <div class="basket__suppliers-inner">
                            <h4 class="mb-3">Описание лота</h4>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Заголовок лота*</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].title"">
                                <div class="materil-group__error-text">Укажите Заголовок лота*</div>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Дополнительные сведения</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].description">
                                <div class="materil-group__error-text">Дополнительные сведения</div>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Примечание</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].note">
                                <div class="materil-group__error-text">Примечание</div>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Ориентировочная сумма контракта</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].estimatedCost">
                                <div class="materil-group__error-text">Ориентировочная сумма контракта</div>
                            </label>
                            <label class="basket__suppliers-field">
                                <input type="checkbox" name="tender.lots[0].delivery"/>
                                <span>Требуется доставка</span>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Адрес доставки</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].deliveryAddress">
                                <div class="materil-group__error-text">Укажите Адрес доставки</div>
                            </label>
                        </div>
                    </div>
                `
            }
            // лот с категориями
            else {
                var categoties = '';
                var lotTable = '';
                this.lotList[0].categoties.map((item, index) => {
                    if(index == 0) {
                        categoties += `${item.name}`
                    }
                    else {
                        categoties += `, ${item.name}`
                    }

                    lotTable += `<div class="table__row" lot-category-index="${index}">
                                    <div class="table__col table__col--btitle">
                                        <div>${item.name}</div>
                                        <div>
                                            ${
                                                item.isCloned ? '<a href="#" class="link link-sm lot-remove-category">Удалить</a>':
                                                                '<a href="#" class="link link-sm lot-clone-category">Дублировать</a>'
                                            }
                                            
                                        </div>
                                    </div>
                                    <div class="table__col table__col--bcount">
                                        <input type="text" class="base-input base-input--sm lot-category-input quantity" value="${item.quantity ? item.quantity : ''}" name="lots[0].tenderItems[${index}].quantity">
                                    </div>
                                    <div class="table__col table__col--bparams">
                                        <select id="" class="select select--sm lot-category-select unitId" value="${item.unitId ? item.unitId : ''}" name="lots[0].tenderItems[${index}].unitId">
                                            <option value="1">кг</option>
                                            <option value="2">т</option>
                                            <option value="3">lb</option>
                                            <option value="4">st</option>
                                        </select>
                                    </div>
                                    <div class="table__col table__col--bsize">
                                        <input type="text" class="base-input base-input--sm lot-category-input size" value="${item.size ? item.size : ''}" name="lots[0].tenderItems[${index}].size">
                                    </div>
                                    <div class="table__col table__col--bwidth">
                                        <input type="text" class="base-input base-input--sm lot-category-input length" value="${item._length ? item._length : ''}" name="lots[0].tenderItems[${index}].length">
                                    </div>
                                    <div class="table__col table__col--bsteel">
                                        <input type="text" class="base-input base-input--sm lot-category-input steel" value="${item.steel ? item.steel : ''}" name="lots[0].tenderItems[${index}].steel">
                                    </div>
                                    <div class="table__col table__col--bprice">
                                        <input type="text" class="base-input base-input--sm lot-category-input maxPrice" value="${item.maxPrice ? item.maxPrice : ''}" name="lots[0].tenderItems[${index}].maxPrice">
                                    </div>
                                    <div class="table__col table__col--bnote">
                                        <input type="text" class="base-input base-input--sm lot-category-input comment" value="${item.comment ? item.comment : ''}" name="lots[0].tenderItems[${index}].comment">
                                    </div>
                                </div>`
                })

                html = `
                    <div class="nav__content active" id="lot-1" data-index="0">
                        <div class="table table--basket mb-4">
                            <div class="table__head">
                                <div class="table__col table__col--btitle">
                                    Наименование
                                </div>
                                <div class="table__col table__col--bcount">
                                    Кол-во
                                </div>
                                <div class="table__col table__col--bparams">
                                    <div class="table__label table__label--black">Ед. изм</div>
                                </div>
                                <div class="table__col table__col--bsize">
                                    <div class="table__label table__label--black">Размер</div>
                                    <div class="table__label">Толщина/Размер</div>
                                </div>
                                <div class="table__col table__col--bwidth">
                                    <div class="table__label table__label--black">Длина</div>
                                    <div class="table__label">Х ширина</div>
                                </div>
                                <div class="table__col table__col--bsteel">
                                    <div class="table__label table__label--black">Сталь</div>
                                </div>
                                <div class="table__col table__col--bprice">
                                    <div class="table__label table__label--black">Цена</div>
                                    <div class="table__label">Не больше</div>
                                </div>
                                <div class="table__col table__col--bnote">
                                    <div class="table__label table__label--black">Примечание</div>
                                </div>
                            </div>
                            <div class="table__body">
                            ${!this.lotList[0].isShowTable ?
                                `<div class="table__row">
                                    <div class="tender-select-category">
                                        <p class="tender-select-category__title">Вы объявляете тендер на приобретение следующих категорий сортамента:</p>
                                        <p class="tender-select-category__list">${categoties}</p>
                                        <p class="tender-select-category__action"><a href="#" class="link lot-show-table">Заполните таблицу</a> или <a href="#" class="link">Добавить файл</a></p>
                                    </div>
                                </div>`
                                :
                                lotTable
                            }
                            </div>
                        </div>

                        <div class="info-block basket__info-block mb-4">
                            <div class="info-block__icon info-block__icon--small">
                                <img src="img/info.svg" alt="">
                            </div>
                            <div class="info-block__text">
                                <h5 class="mb-2">Внимание!</h5>
                                <ul>
                                    <li><em>— если у Вас несколько позиций, заполните поля «кол-во» «размер» «сталь»</em></li>
                                    <li><em>— если позиций много, просто выберете виды сортамента и прикрепите файл со списком
                                        <br>снизу станицы</em></li>
                                </ul>
                            </div>
                        </div>

                        <div class="basket__suppliers-inner">
                            <h4 class="mb-3">Описание лота</h4>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Заголовок лота*</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].title"">
                                <div class="materil-group__error-text">Укажите Заголовок лота*</div>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Дополнительные сведения</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].description">
                                <div class="materil-group__error-text">Дополнительные сведения</div>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Примечание</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].note">
                                <div class="materil-group__error-text">Примечание</div>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Ориентировочная сумма контракта</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].estimatedCost">
                                <div class="materil-group__error-text">Ориентировочная сумма контракта</div>
                            </label>
                            <label class="basket__suppliers-field">
                                <input type="checkbox" name="tender.lots[0].delivery"/>
                                <span>Требуется доставка</span>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Адрес доставки</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].deliveryAddress">
                                <div class="materil-group__error-text">Укажите Адрес доставки</div>
                            </label>
                        </div>
                    </div>
                `
            }    
            $('.tender-content').html(html)
            $('.select.select--sm').select2({
                width: '100%',
                selectionCssClass: 'base-select select--sm',
                dropdownCssClass: 'select-header-dropdown',
            })
            $('.tender-content .select').each(function(){
                // console.log($(this).val(), 'loop sel val')
                var value = $(this).attr('value');
                $(this).val(value)
                $(this).trigger('change');
            });
        }
        else {
            var htmlNavLinks = '';
            var htmlContent = '';

            this.lotList.map((item, index) => {
                htmlNavLinks += `<li class="nav__item ${this.activeLotIndex == index ? 'active' : ''}">
                                    <a class="nav__link" data-page="#lot-${index}" href="#">Лот ${index + 1}</a>
                                </li>`
            })


            // пустой лот
            if(this.lotList[0].categoties.length == 0) {
                htmlContent = `
                    <div class="nav__content active" id="lot-1" data-index="0">
                        <div class="table table--basket mb-4">
                            <div class="table__head">
                                <div class="table__col table__col--btitle">
                                    Наименование
                                </div>
                                <div class="table__col table__col--bcount">
                                    Кол-во
                                </div>
                                <div class="table__col table__col--bparams">
                                    <div class="table__label table__label--black">Ед. изм</div>
                                </div>
                                <div class="table__col table__col--bsize">
                                    <div class="table__label table__label--black">Размер</div>
                                    <div class="table__label">Толщина/Размер</div>
                                </div>
                                <div class="table__col table__col--bwidth">
                                    <div class="table__label table__label--black">Длина</div>
                                    <div class="table__label">Х ширина</div>
                                </div>
                                <div class="table__col table__col--bsteel">
                                    <div class="table__label table__label--black">Сталь</div>
                                </div>
                                <div class="table__col table__col--bprice">
                                    <div class="table__label table__label--black">Цена</div>
                                    <div class="table__label">Не больше</div>
                                </div>
                                <div class="table__col table__col--bnote">
                                    <div class="table__label table__label--black">Примечание</div>
                                </div>
                            </div>
                            <div class="table__body">
                                <div class="table__row">
                                    <div class="table__col">
                                        <p class="p xs text-gray pt-1 pb-1">Выберите интересующие Вас позиции (слева)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="info-block basket__info-block mb-4">
                            <div class="info-block__icon info-block__icon--small">
                                <img src="img/info.svg" alt="">
                            </div>
                            <div class="info-block__text">
                                <h5 class="mb-2">Внимание!</h5>
                                <ul>
                                    <li><em>— если у Вас несколько позиций, заполните поля «кол-во» «размер» «сталь»</em></li>
                                    <li><em>— если позиций много, просто выберете виды сортамента и прикрепите файл со списком
                                        <br>снизу станицы</em></li>
                                </ul>
                            </div>
                        </div>

                        <div class="basket__suppliers-inner">
                            <h4 class="mb-3">Описание лота</h4>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Заголовок лота*</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].title"">
                                <div class="materil-group__error-text">Укажите Заголовок лота*</div>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Дополнительные сведения</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].description">
                                <div class="materil-group__error-text">Дополнительные сведения</div>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Примечание</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].note">
                                <div class="materil-group__error-text">Примечание</div>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Ориентировочная сумма контракта</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].estimatedCost">
                                <div class="materil-group__error-text">Ориентировочная сумма контракта</div>
                            </label>
                            <label class="basket__suppliers-field">
                                <input type="checkbox" name="tender.lots[0].delivery"/>
                                <span>Требуется доставка</span>
                            </label>
                            <label class="materil-group basket__suppliers-field">
                                <span class="materil-group__label">Адрес доставки</span>
                                <input type="text" class="form-control base-input materil-group__input" name="lots[0].deliveryAddress">
                                <div class="materil-group__error-text">Укажите Адрес доставки</div>
                            </label>
                        </div>
                    </div>
                `
            }

            $('.tender__nav__links').html(htmlNavLinks)
            $('.tender-content').html(htmlContent)
        }
        
        // this.lotList.map((item, index) => {
        //     console.log(item)
        // })
    }
}

export default Tender;