class HomeLocator {
    get headerTitle() {
        return $('//android.view.View[@content-desc="Belajar Bareng"]');
    }

    get inputPost() {
        return $('//android.widget.EditText[contains(@hint, "Apa yang kamu pikirkan")]');
    }

    get btnPosting() {
        return $('~Posting');
    }

    get feedList() {
        return $('//android.view.View[contains(@bounds, "[53,1111]")]');
    }
}

module.exports = new HomeLocator();
