#include <QApplication>
#include <QDeclarativeView>
#include <QDeclarativeEngine>

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);

    QDeclarativeView view;
    QApplication::connect(const_cast<QDeclarativeEngine*>(view.engine()), SIGNAL(quit()), &app, SLOT(quit()));
    view.setSource(QUrl::fromLocalFile("solarwolf.qml"));
    view.show();

    return app.exec();
}
