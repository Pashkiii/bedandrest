const realtyCalendarAction = {
    create: 'create_booking',
    update: 'update_booking',
    delete: 'delete_booking'
};

const extraServices = {
    /** @description Островского ул., д. 75/1 */
    '31629': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-1&utm_content=kak-doma&utm_term=%D0%9E%D1%81%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2C75-1',
    /** @description Шимановского 5 кв 11  */
    '31618': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-2&utm_content=kak-doma&utm_term=Шимановского,5',
    /** @description Зейская 53 кв 112 */
    '193112': 'https://app.touchh.ru/kak-doma-welcome/?utm_medium=qr-3&utm_content=kak-doma&utm_term=Зейская,53',
    /** @description Мухина 29 кв 75 */
    '72654': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-3&utm_content=kak-doma&utm_term=Мухина,29',
    /** @description Тополинная 82 кв 37 */
    '79827': 'https://app.touchh.ru/kak-doma-welcome/?utm_medium=qr-5&utm_content=kak-doma&utm_term= Тополинная,82',
    /** @description Новая 2 кв 33 */
    '31616': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-4&utm_content=kak-doma&utm_term=Новая,2',
    /** @description Красноармейская 164 кв 112 */
    '105229': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-5&utm_content=kak-doma&utm_term=Красноармейская,164',
    /** @description Горького 154 - 2 кв 163 */
    '178077': 'https://app.touchh.ru/kak-doma-welcome/?utm_medium=qr-8&utm_content=kak-doma&utm_term=Горького,154-2',
    /** @description Ленина 176/2 кв 106 */
    '101995': 'https://app.touchh.ru/kak-doma-welcome/?utm_medium=qr-9&utm_content=kak-doma&utm_term=Ленина,176-2',
    /** @description Игнатьевское 10/4 кв 122 */
    '85106': 'https://app.touchh.ru/kak-doma-welcome/?utm_medium=qr-10&utm_content=kak-doma&utm_term= Игнатьевское,10-4',
    /** @description Батарейная 7/1 кв 209 */
    '155176': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-6&utm_content=kak-doma&utm_term=Батарейная,7-1',
    /** @description Комсомольская 89 кв 338 */
    '119337': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-7&utm_content=kak-doma&utm_term=Комсомольская,89',
    /** @description Ленина 74 кв 5 */
    '104667': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-8&utm_content=kak-doma&utm_term=Ленина,74',
    /** @description Зейская 220 кв 200 */
    '61717': 'https://app.touchh.ru/kak-doma-welcome-2/?utm_medium=qr-4&utm_content=kak-doma&utm_term=Зейская,220',
    /** @description Островского 120 кв 50 */
    '142554': 'https://app.touchh.ru/kak-doma-welcome-2/?utm_medium=qr-5&utm_content=kak-doma&utm_term=Островского,120',
    /** @description Октябрьская 221 кв 110 */
    '48337': 'https://app.touchh.ru/kak-doma-welcome-2/?utm_medium=qr-6&utm_content=kak-doma&utm_term=Октябрьская,221',
    /** @description Горького 154 кв 17 */
    '64943': 'https://app.touchh.ru/kak-doma-welcome-2/?utm_medium=qr-7&utm_content=kak-doma&utm_term=Горького,154',
    /** @description Игнатьевское 14/11 кв 167 */
    '47272': 'https://app.touchh.ru/kak-doma-welcome-2/?utm_medium=qr-8&utm_content=kak-doma&utm_term=Игнатьевское,14-11',
    /** @description Калинина 76 кв 9 */
    '31631': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-9&utm_content=kak-doma&utm_term=Калинина,76',
    /** @description Ленина 119/1 кв 68 */
    '159092': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-10&utm_content=kak-doma&utm_term=Ленина,119-1',
    /** @description Шимановского 80 кв 36 */
    '31630': 'https://app.touchh.ru/kak-doma-welcome-3/?utm_medium=qr-1&utm_content=kak-doma&utm_term=Шимановского,80',
    /** @description Горького 40 кв 4 */
    '91687': 'https://app.touchh.ru/kak-doma-welcome-3/?utm_medium=qr-2&utm_content=kak-doma&utm_term=Горького,40',
    /** @description Амурская 69 кв 32 */
    '72656': 'https://app.touchh.ru/kak-doma-welcome-3/?utm_medium=qr-3&utm_content=kak-doma&utm_term=Амурская,69',
    /** @description Лазо 55/1 кв 32 */
    '112384': 'https://app.touchh.ru/kak-doma-welcome-4/?utm_medium=qr-11&utm_content=kak-doma&utm_term=Лазо,55-1',
    /** @description Горького 154 -3 кв 118 */
    '181082': 'https://app.touchh.ru/kak-doma-welcome-3/?utm_medium=qr-5&utm_content=kak-doma&utm_term=Горького,154-3',
    /** @description Политехническая 144 кв 212 */
    '139457': 'https://app.touchh.ru/kak-doma-welcome-3/?utm_medium=qr-6&utm_content=kak-doma&utm_term=Политехническая,144',
    /** @description Амурская 55/1 кв 100 */
    '141275': 'https://app.touchh.ru/kak-doma-welcome-3/?utm_medium=qr-7&utm_content=kak-doma&utm_term=Амурская,55-1',
    /** @description Горького 147 кв 34 */
    '199213': 'https://app.touchh.ru/kak-doma-welcome-3/?utm_medium=qr-8&utm_content=kak-doma&utm_term=Горького,147',

    /** @description Тестовая квартира */
    '219768': 'https://app.touchh.ru/kak-doma-welcome-3/?utm_medium=qr-8&utm_content=kak-doma&utm_term=%D0%93%D0%BE%D1%80%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE%2C147'
};

module.exports = {
    extraServices,
    realtyCalendarAction,
};
