FROM continuumio/miniconda3:latest
WORKDIR /server
COPY ./environment.yml ./
COPY ./ ./

RUN conda env create -f environment.yml
RUN echo "source activate achievements" > ~/.bashrc
ENV PATH /opt/conda/envs/achievements/bin:$PATH

ENTRYPOINT ["gunicorn", "-b", ":3001", "--access-logfile", "-", "--error-logfile", "-", "app:app"]
