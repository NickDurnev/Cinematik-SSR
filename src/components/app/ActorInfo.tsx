"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ImageWrapper, Show } from "@/components";
import { cn } from "@/libs/tailwind-merge";
import { IActor } from "@/types/movie";

export const ActorInfo = ({ data }: { data: IActor }) => {
  const params = useParams();
  const actorID = params?.actorID || data.id;

  const {
    biography,
    profile_path,
    name,
    birthday,
    deathday,
    gender,
    place_of_birth,
    popularity,
  } = data;

  return (
    <div className="flex tablet:flex-row flex-col tablet:items-start items-center gap-8">
      <div
        className={cn(
          "flex h-[465px] w-[310px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px]",
          profile_path && "bg-[#666666]",
        )}
      >
        <Show
          when={profile_path}
          fallback={
            <ImageWrapper>
              <Image
                src="/icons/Actor404.svg"
                alt="Actor placeholder"
                className="h-auto w-[120px]"
              />
            </ImageWrapper>
          }
        >
          <img
            src={`https://image.tmdb.org/t/p/w400${profile_path}`}
            alt={name}
            className="h-full w-full object-cover"
          />
        </Show>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <h2 className="font-bold text-2xl">{name}</h2>
        <p className="text-base">{biography}</p>
        <ul className="flex gap-8">
          <li className="flex flex-col gap-2">
            <Show when={birthday}>
              <p>Birthday date:</p>
            </Show>
            <Show when={deathday}>
              <p>Deathday:</p>
            </Show>
            <Show when={gender}>
              <p>Gender:</p>
            </Show>
            <Show when={place_of_birth}>
              <p>Place of birthday:</p>
            </Show>
            <Show when={popularity}>
              <p>Rating:</p>
            </Show>
          </li>
          <li className="flex flex-col gap-2">
            {birthday && <p>{birthday}</p>}
            {deathday && <p>{deathday}</p>}
            {gender === 1 ? <p>Female</p> : <p>Male</p>}
            {place_of_birth && <p>{place_of_birth}</p>}
            {popularity ? <p>{popularity.toFixed(1)}</p> : null}
          </li>
        </ul>
        <Link
          href={`/moviesbyactor/${actorID}`}
          className="mt-12 flex h-[70px] w-[140px] items-center justify-center rounded-[10px] border border-[var(--text-color)] bg-transparent font-muller text-[20px] text-[var(--text-color)] uppercase transition-all duration-300 hover:bg-[#4847473c]"
        >
          Movies
        </Link>
      </div>
    </div>
  );
};
