import sys
import requests
from PyQt5.QtWidgets import *
from PyQt5.QtCore import QTimer
import matplotlib.pyplot as plt
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas

API = "http://127.0.0.1:8000"


class App(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Device Dashboard")
        self.setGeometry(200, 200, 500, 400)

        # UI
        self.status = QLabel("Status: unknown")
        self.sensor = QLabel("Sensor: ---")
        self.log = QTextEdit()
        self.log.setReadOnly(True)

        self.start_btn = QPushButton("Start")
        self.stop_btn = QPushButton("Stop")
        self.refresh_btn = QPushButton("Refresh")

        self.start_btn.clicked.connect(self.start_device)
        self.stop_btn.clicked.connect(self.stop_device)
        self.refresh_btn.clicked.connect(self.get_sensor)

        # Chart
        self.fig, self.ax = plt.subplots()
        self.canvas = FigureCanvas(self.fig)

        self.temp_data = []

        # Layout
        layout = QVBoxLayout()
        layout.addWidget(self.status)
        layout.addWidget(self.sensor)

        layout.addWidget(self.start_btn)
        layout.addWidget(self.stop_btn)
        layout.addWidget(self.refresh_btn)

        layout.addWidget(self.canvas)
        layout.addWidget(QLabel("Logs:"))
        layout.addWidget(self.log)

        self.setLayout(layout)

        # Auto update timer
        self.timer = QTimer()
        self.timer.timeout.connect(self.get_sensor)
        self.timer.start(2000)

    def start_device(self):
        requests.post(f"{API}/start")
        self.status.setText("Status: RUNNING")
        self.log.append("Device started")

    def stop_device(self):
        requests.post(f"{API}/stop")
        self.status.setText("Status: STOPPED")
        self.log.append("Device stopped")

    def get_sensor(self):
        try:
            r = requests.get(f"{API}/sensor")
            data = r.json()

            if "error" in data:
                self.sensor.setText("Device OFF")
                return

            temp = data["temperature"]
            press = data["pressure"]
            volt = data["voltage"]

            self.sensor.setText(
                f"T: {temp:.2f}°C | P: {press:.2f} | V: {volt:.2f}V"
            )

            self.log.append(f"Temp={temp:.2f}")

            # chart update
            self.temp_data.append(temp)
            if len(self.temp_data) > 20:
                self.temp_data.pop(0)

            self.ax.clear()
            self.ax.plot(self.temp_data)
            self.ax.set_title("Temperature")
            self.canvas.draw()

        except Exception as e:
            self.log.append(f"Error: {str(e)}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = App()
    window.show()
    sys.exit(app.exec_())