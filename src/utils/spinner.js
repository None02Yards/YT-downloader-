import { createSpinner } from "nanospinner";

export const spinner = createSpinner("Initializing").start();

export const updateSpinner = (text) =>
  spinner.update({ text });

export const succeedSpinner = (text) =>
  spinner.success({ text });

export const failSpinner = (text) =>
  spinner.error({ text });
