module.exports = {
    semi: true, // Her satır sonuna noktalı virgül ekler
    singleQuote: true, // Çift tırnak yerine tek tırnak kullanır
    trailingComma: "es5", // Son virgülleri ES5 kurallarına göre ekler (nesneler, diziler, vs.)
    useTabs: false, // boşluk için tab
    tabWidth: 4, // tab genişliği 4 space
    bracketSpacing: true, // obj içindeki süslü parantezlerin arasına boşluk ekler
    arrowParens: "always", // tek parametreli arrow function'larda bile parantez kullanır
    vueIndentScriptAndStyle: true, // Vue içindeki script ve style tag'larını da içe girintili yapar
    bracketSameLine: true, // Süslü parantezleri aynı satırda kapatır
    htmlWhitespaceSensitivity: "ignore", // html'de boşlukları göz ardı eder
    printWidth: 150, // bazı kuralların etkinleşmesi için satır karakter sayısı (column)
};