# Как сделан этот лендинг

## 1. С чего начали

- **Референс дизайна:** макет сайта строительной компании: тёмный фон, оранжевые акценты, рабочие в касках. Макет чужой, поэтому в репозитории его нет.
- **Референс анимаций:** текстовая спецификация лендинга с motionsites.ai. Из неё взяли язык движения: двойная рамка с квадратиками по углам, рамка рисуется из левого верхнего угла через `clip-path`, все блоки появляются с одной кривой `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Задача заказчика:** «сочно, красиво, современно, и чтобы мужики из макета двигались».

## 2. Картинки: Nano Banana Pro в Higgsfield

Рабочих вырезали из макета обычным кропом и дали модели как image reference с просьбой перерисовать ту же сцену в 2K без текста и кнопок. Лица, каски и жилеты сохранились, а фон модель заменила на Прагу.

Что сработало:

- **Фраза «WITHOUT any of its text, buttons or graphics»** убирает надписи макета.
- **Композицию задаём словами:** «оба в правой половине кадра, левая половина тёмная». Так слева остаётся место под заголовок.
- **Общий хвост промпта** держит одинаковый свет и цвет на всех кадрах:

> Photorealistic cinematic photograph, golden hour, warm orange sunset backlight with soft lens flare, dusty air, deep dark shadows, orange and teal color grade, shallow depth of field, shot on 35mm, ultra detailed skin and fabric. Absolutely no text, no letters, no logos, no UI, no watermark anywhere in the image.

<details>
<summary>Промпты всех шести кадров</summary>

**Первый экран** (16:9, 2K, reference: кроп рабочих из макета):

> Recreate the scene from the reference image as a clean, high resolution photograph WITHOUT any of its text, buttons or graphics. Same two construction workers, same faces, beards, hard hats (one orange-yellow, one white), orange high-visibility vests with reflective stripes over dark work shirts; the man in the white hard hat holds a tablet and both look at its screen. Place both men in the right half of the frame, framed from the waist up. The left half is darker open space: a residential construction site with an orange excavator, scaffolding and the silhouettes of Prague red rooftops and church spires in warm haze. + общий хвост

**Прораб с чертежами** (16:9, reference: кроп из макета):

> Recreate the worker from the reference image as a clean, high resolution photograph WITHOUT any of its text, buttons or graphics. Same man: short beard, white hard hat, orange high-visibility vest over a dark denim work shirt, rolled blueprints under his arm, looking slightly to the side with a calm confident expression. Place him in the right third of the frame, waist up. The left two thirds: a construction site at sunset with a tower crane, scaffolding and a classic central European city skyline in warm haze, darker toward the left edge. + общий хвост

**Сантехник с горящим телефоном** (16:9, reference: кроп рабочих, только для стиля):

> Same cinematic style, color grade and type of man as the reference workers. A plumber in his thirties with a short beard, orange high-visibility vest over a dark work shirt, kneeling under an open kitchen sink in a modern apartment, both hands busy tightening a pipe with a big red wrench. On the floor next to his open toolbox lies his smartphone, face up, its screen glowing bright with an incoming call (just a bright glowing screen, no readable text). Warm late afternoon light from a window, dark moody background. Plumber on the right half of the frame, phone clearly visible in the lower middle. + общий хвост

**Каска** (4:3, reference: кроп каски из макета):

> Recreate the object from the reference as a clean high resolution product-style photograph: a glossy orange construction hard hat resting on a rough concrete slab next to a worn hammer and a folding wooden ruler, dusty construction site at golden hour behind it, warm sunset light raking from the right, dark background on the left. + общий хвост

**Электрик** (4:3, без reference):

> An electrician in his forties wearing a dark work shirt and safety glasses works on an open residential electrical panel with neatly organised colourful wires, holding a screwdriver, apartment hallway, warm cinematic light, friendly focused face. + общий хвост

**Ванная** (4:3, без reference):

> A freshly renovated modern bathroom in a Prague apartment: large light-grey stone tiles, walk-in shower with black fixtures and glass, wooden vanity, warm evening light, a tiler's bucket and trowel left in the corner as the only sign of work, architectural interior photography. + общий хвост

</details>

## 3. Видео: Seedance 2.0 в Higgsfield

Три кадра оживили через image-to-video. Главный трюк: **один и тот же кадр подаём и как первый, и как последний.** Ролик возвращается в исходную позу, и на сайте петля идёт без видимой склейки.

```bash
higgsfield generate create seedance_2_0 \
  --start-image hero.png --end-image hero.png \
  --duration 10 --resolution 1080p --aspect_ratio 16:9 \
  --generate_audio false --wait \
  --prompt "..."
```

- **Цена:** 10 секунд в 1080p стоят 120 кредитов, 8 секунд стоят 96. Картинки почти бесплатные.
- **Камера гуляет:** в середине ролика модель сдвинула кадр сильнее, чем просили. Это прикрыто тёмным градиентом слева под текстом.
- **Текст поверх видео делаем в HTML, а не в генерации.** Модели плохо пишут кириллицу. Поэтому карточки заявок, пропущенный звонок и телефоны в демо сверстаны, а не нарисованы.

<details>
<summary>Промпты трёх видео</summary>

**Первый экран** (10 с):

> Cinematic live-action shot, static composition with a very slow push-in. Two construction workers on a Prague building site at sunset. The man in the white hard hat taps the tablet screen and turns it slightly toward his colleague; the man in the yellow hard hat reads it, smiles and nods, then both look up toward the site for a moment, the white-hat man points with his hand toward the excavator, and they return to the tablet in the same pose as the beginning. In the background the orange excavator slowly swings its arm and scoops soil. Warm dust particles drift through the sunlight, soft lens flare shimmer. Natural, realistic, relaxed body language, no fast moves, faces stay consistent. The last frame matches the first frame exactly for a seamless loop. No text, no subtitles.

**Сантехник** (8 с):

> Cinematic live-action shot, static camera with a very slow push-in. A plumber kneels under a kitchen sink, tightening the pipe with a red wrench with steady effort. The smartphone on the shelf below lights up brighter and vibrates with an incoming call, buzzing slightly on the surface. The plumber glances at the phone for a second, frowns, but his hands stay on the wrench and he keeps working; the phone keeps glowing and pulsing. Warm sunlight from the window, dust floating in the air. Realistic, natural motion. The last frame matches the first frame exactly for a seamless loop. No text, no subtitles.

**Прораб** (8 с):

> Cinematic live-action shot with a slow gentle dolly. A construction foreman in a white hard hat and orange vest holds rolled blueprints and calmly looks out over the city at sunset, then turns his head a little toward the camera with a confident small smile, then looks back toward the city. The tower crane slowly rotates its jib and the hook sways, sun flare shimmers, a light breeze moves the edges of the blueprints. Realistic, natural, calm. The last frame matches the first frame exactly for a seamless loop. No text, no subtitles.

</details>

## 4. Сжатие для сайта

Из генератора видео приходят по 3-7 МБ. Пережимаем без звука и с `faststart`, чтобы ролик начинал играть до полной загрузки:

```bash
ffmpeg -i raw-hero.mp4 -vf scale=1920:-2 -c:v libx264 -profile:v high \
  -pix_fmt yuv420p -preset slow -crf 25 -movflags +faststart -an hero.mp4
```

- **Для телефонов** первый экран отдаётся отдельным файлом 1280 px (`hero-720.mp4`).
- **Постер:** у каждого видео есть первый кадр в WebP, чтобы до загрузки не было чёрного прямоугольника.
- **Итог:** все медиа вместе весят около 6 МБ.

## 5. Вёрстка и анимации

- **`Reveal`** держит блок прозрачным, пока он не попал на экран (IntersectionObserver), потом вешает класс анимации с задержкой. Так у каждого блока своя очередь появления.
- **`Frame`** рисует двойную рамку: сплошная линия, пунктир и четыре квадратика по углам. Линии проявляются анимацией `border-draw`.
- **`LoopVideo`** играет видео только когда оно на экране. Для iOS атрибут `muted` ставится вручную, иначе автоплей не стартует.
- **Карточки заявок и демо телефонов** анимированы через framer-motion (`AnimatePresence`, `layout`). Демо работает как цепочка фаз на таймерах: ввод текста, отправка, уведомление, ответ клиенту, список заявок.
- **Калькулятор:** число докручивается пружиной `useSpring`, расчёт простой: заявки в неделю × 4,33 × средний чек × доля, которую вы бы взяли.
- **Шрифт заголовков Tektur** сужен до 80% через `font-stretch`, так он похож на квадратный кондензированный шрифт из спецификации. При этом в нём есть кириллица и чешская латиница.

Страница собрана в Claude Code по макету и спецификации анимаций.
