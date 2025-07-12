{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "f4eed3e1-42cc-4a32-837a-ab940c4fad08",
   "metadata": {},
   "outputs": [],
   "source": [
    "from flask import Flask\n",
    "\n",
    "app = Flask(__name__)\n",
    "\n",
    "@app.route('/home')\n",
    "def home():\n",
    "    return \"Hello from Flask in Jupyter Notebook!\"\n",
    "if __name__== '__main__':\n",
    "    app.run()\n",
    "    \n",
    "\n",
    "\n",
    "\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "8e172322-7aaf-4f92-a7d0-8e770c0812ec",
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.12.7"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
